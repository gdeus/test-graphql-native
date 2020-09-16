import React from 'react';
import {Header} from 'react-native-elements';


export default function AppBar(){
    return(
        <Header
        placement="center"
        centerComponent={{ text: 'GRAPH QL TEST', style: { color: '#fff' } }}
        />
    );
}