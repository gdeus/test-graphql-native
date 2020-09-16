import React, { useState, useEffect } from 'react';
import { Button, Overlay } from 'react-native-elements';
import { View, Text, ActivityIndicator } from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';
import LoadingModal from './loadingModal';

const GET_REPOSITORY= gql`
        query repository($name: String!){
            viewer{
                repository(name: $name){
                    id
                    name
                    owner{
                        login
                    }
                    stargazers(first: 100){
                        totalCount
                        nodes{
                            id
                        }
                    }
                }
            }
        }
    `;

const PUT_STAR=gql`
    mutation addStar($starrableId: String!, $clientMutationId: String!){
        addStar(input:{
            starrableId: $starrableId
            clientMutationId: $clientMutationId
        }) {
            clientMutationId
        }
    }
`

export default function CustomModal(props){
    const name = props.item.name;
    const [putStar, { data: dataStar, loading: loadingStar, error: mutationError }] = useMutation(PUT_STAR);
    const { loading, error, data, refetch } = useQuery(GET_REPOSITORY,{
        variables: { name },
    });
    const [star, setStar] = useState(false);
    const [qtyStars, setQtyStars]  = useState();

    useEffect(() => {
        if(!loading){
            setStar(data.viewer.repository.stargazers.nodes.find(id => id.id === props.id) ? true : false)
            setQtyStars(data.viewer.repository.stargazers.nodes.length);
        }
    }, [loading]);

    const buttonStar = <Button
        title="Dar estrela"
        onPress={() => { 
            putStar({variables: {clientMutationId: props.id,  starrableId: data.viewer.repository.id},});
            if(!mutationError){
                setStar(true);
                setQtyStars(qtyStars + 1);
                refetch();
            }
        }}
    />

    if(loading){
        return(
            <LoadingModal isVisible={props.open} onBackdropPress={props.setClose}/>
        );
    }
  return (
    <View>
      <Overlay isVisible={props.open} onBackdropPress={props.setClose}>
        <View>
            <Text>Nome: {data.viewer.repository.name}</Text>
            <Text>Owner: {data.viewer.repository.owner.login}</Text>
            <Text>Estrelas: {qtyStars}</Text>
            {star ? <Text>Você já satribuiu uma estrela para esse repositório</Text>:  buttonStar}
        </View> 
      </Overlay>
    </View>
  );
};