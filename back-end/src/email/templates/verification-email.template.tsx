import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import { VerificationEmailProps } from '../email.types'

export function VerificationEmail({ url, appName }: VerificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Verify your email</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section>
            <Text style={heading}>Verify your email</Text>

            <Text style={text}>
              Thank you for signing up for {appName}! Please click the button
              below to verify your email address and complete your registration.
            </Text>

            <Section style={buttonContainer}>
              <Button href={url} style={button}>
                Verify Email
              </Button>
            </Section>
          </Section>

          <Text style={textSmall}>
            If button doesn't work, copy and paste the following link into your
            browser:
          </Text>

          <Link href={url} style={link}>
            {url}
          </Link>

          <Text style={footer}>
            If you did not create an account, no further action is required.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const body = {
  backgroundColor: '#f9f9f9',
  fontFamily: 'Arial, sans-serif',
  padding: '20px',
}

const container = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  maxWidth: '600px',
  margin: '0 auto',
  padding: '20px',
}

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '20px',
}

const text = {
  fontSize: '16px',
  lineHeight: '1.5',
  marginBottom: '20px',
}

const buttonContainer = {
  textAlign: 'center' as const,
}

const button = {
  backgroundColor: '#007bff',
  color: '#ffffff',
  padding: '10px 20px',
  borderRadius: '4px',
  textDecoration: 'none',
  fontSize: '16px',
}

const textSmall = {
  fontSize: '14px',
  lineHeight: '1.5',
  marginBottom: '10px',
}

const link = {
  color: '#007bff',
  wordBreak: 'break-all' as const,
}

const footer = {
  fontSize: '12px',
  color: '#888888',
  marginTop: '20px',
}
