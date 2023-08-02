import React from 'react';
import { Container,Title } from './styles';
import { Text } from 'react-native'

export default function Header() {
 return (
    <Container>
        <Title>
            Dev
            <Text style={{ fontStyle:"italic", color: '#e52246'}}>Post</Text>
        </Title>
    </Container>
  );
}