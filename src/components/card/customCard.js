import React, { useState } from  'react';
import { Text, View } from 'react-native'
import { Card, Button, Icon } from 'react-native-elements'
import CustomModal from '../modal/customModal'


export default function CustomCard(props){
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return(
    <Card style={{flex: 1}}>
        <Card.Title>{props.item.name}</Card.Title>
        <Card.Divider/>
        <View>
            <Text>Criado em: {props.item.createdAt}</Text>
        </View>
        <Button
            icon={<Icon name='info' color='#ffffff' />}
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            onPress={() => handleOpen()}
            title='Informações' 
        />
            {open ? <CustomModal id={props.idUser} item={props.item} open={open} setClose={handleClose} setOpen={setOpen}/> : null}
    </Card>
    )
}