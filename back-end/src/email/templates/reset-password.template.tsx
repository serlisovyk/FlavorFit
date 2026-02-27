import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Button,
  Link,
} from '@react-email/components'
import { ResetPasswordEmailProps } from '../email.types'

export function ResetPasswordEmail({ url, appName }: ResetPasswordEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section>
            <Text style={heading}>Reset your password</Text>

            <Text style={text}>
              You recently requested to reset your password for your {appName}
              account.
            </Text>

            <Section style={buttonContainer}>
              <Button href={url} style={button}>
                Reset Password
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

          <Text style={text}>Link will expire limited time.</Text>

          <Text style={footer}>
            If you did not request a password reset, no further action is
            required.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const body = {
  backgroundColor: '#f9f9f9',
  fontFamily: 'Arial, sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  padding: '20px',
  margin: '20px auto',
  width: '100%',
  maxWidth: '600px',
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

const textSmall = {
  fontSize: '14px',
  lineHeight: '1.5',
  marginBottom: '10px',
}

const buttonContainer = {
  textAlign: 'center',
  marginBottom: '20px',
}

const button = {
  backgroundColor: '#007bff',
  color: '#ffffff',
  padding: '10px 20px',
  borderRadius: '4px',
  textDecoration: 'none',
  fontSize: '16px',
}

const link = {
  color: '#007bff',
  textDecoration: 'none',
  wordBreak: 'break-all',
}

const footer = {
  fontSize: '14px',
  lineHeight: '1.5',
  marginTop: '20px',
}
