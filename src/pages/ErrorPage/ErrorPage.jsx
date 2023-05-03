import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ErrorPage = () => {
  return (
    <Page>
      <Wrapper>
        <Error>404</Error>
        <Description>This page doesn't exist</Description>
      </Wrapper>
      <Link
        to="/"
        style={{
          color: 'black',
        }}
      >
        Back to homepage
      </Link>
    </Page>
  );
};

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin-top: 61px;
`;

const Error = styled.h1`
    font-size: 400px;
    background-color
`;
const Description = styled.p`
  font-size: 150px;
`;

const Wrapper = styled.div`
  height: fit-content;
  align-items: center;
  display: flex;
`;

export default ErrorPage;
