import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

const EmailTemplate = ({ userId }: { userId: string }) => {
  return (
    <Html>
      <Head />
      <Preview>State Wizard: Confirme seu e-mail</Preview>
      <Tailwind>
        <Body className="bg-gray-100 m-0 p-0">
          <Container className="mx-auto my-20 px-4 w-[600px]">
            <Section className="bg-white rounded-lg p-8">
              <Heading className="text-3xl text-black m-0 mb-4">
                Confirme seu e-mail
              </Heading>
              
              <Text className="text-gray-600 m-0 mb-4">
                Hey, state machine wizard! 👋
              </Text>

              <Text className="text-gray-600 m-0 mb-4">
                Por favor, confirme seu e-mail clicando no link abaixo.
              </Text>

              <Button 
                href={`https://statewizard.com/subscribe?id=${userId}`}
                className="box-border bg-black text-white px-6 py-3 rounded-lg text-center w-full"
              >
                Confirmar e-mail
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailTemplate;