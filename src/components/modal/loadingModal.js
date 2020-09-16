import React, { useState, useEffect } from 'react';
import { Button, Overlay } from 'react-native-elements';
import { View, Text, ActivityIndicator } from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';

export default function LoadingModal(props){
  return (
    <Overlay isVisible={props.isVisible} onBackdropPress={props.onBackdropPress}>
        <View>
            <ActivityIndicator/>
        </View>
    </Overlay>
  );
};