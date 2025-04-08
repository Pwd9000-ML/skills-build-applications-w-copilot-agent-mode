import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Card, Spinner, Alert, Badge } from 'react-bootstrap';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('https://ideal-space-eureka-64v95r4wg9wcrx4j-8000.app.github.dev/api/leaderboard/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setLeaderboard(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError('Failed to load leaderboard. Please try again later.');
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return (
    <Container className="text-center mt-5">
      <Spinner animation="border" role="status" className="loading-spinner">
        <span className="visually-hidden">Loading leaderboard...</span>
      </Spinner>
      <h2 className="mt-3">Loading leaderboard...</h2>
    </Container>
  );

  if (error) return (
    <Container className="mt-5">
      <Alert variant="danger">
        <Alert.Heading>Error Loading Data</Alert.Heading>
        <p>{error}</p>
      </Alert>
    </Container>
  );

  return (
    <Container className="page-container">
      <Row>
        <Col>
          <h1 className="section-title display-4 text-center mb-4">Leaderboard</h1>
          <Card>
            <Card.Body>
              {leaderboard.length === 0 ? (
                <Alert variant="info">No leaderboard entries found.</Alert>
              ) : (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>User</th>
                      <th>Team</th>
                      <th>Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry, index) => (
                      <tr key={entry.id}>
                        <td>
                          {index === 0 ? (
                            <Badge bg="warning" text="dark">🥇 {index + 1}</Badge>
                          ) : index === 1 ? (
                            <Badge bg="secondary">🥈 {index + 1}</Badge>
                          ) : index === 2 ? (
                            <Badge bg="danger">🥉 {index + 1}</Badge>
                          ) : (
                            index + 1
                          )}
                        </td>
                        <td>{entry.user.name}</td>
                        <td>{entry.team.name}</td>
                        <td><Badge bg="primary" pill>{entry.points}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Leaderboard;

export default Leaderboard;
