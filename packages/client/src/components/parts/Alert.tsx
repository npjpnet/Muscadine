import styled from 'styled-components'

interface Props {
  title?: string
  children: React.ReactNode
}
const Alert: React.FC<Props> = (props) => (
  <Container>
    {props.title && <Title>{props.title}</Title>}
    {props.children && <p>{props.children}</p>}
  </Container>
)

export default Alert

const Container = styled.div`
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }

  padding: 10px;
  background-color: var(--secondary-color);
`
const Title = styled.h2`
  margin-bottom: 5px;
  font-size: 1rem;
`
