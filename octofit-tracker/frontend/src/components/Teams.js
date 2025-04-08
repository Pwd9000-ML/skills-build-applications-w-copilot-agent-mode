import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('https://ideal-space-eureka-64v95r4wg9wcrx4j-8000.app.github.dev/api/teams/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTeams(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError('Failed to load teams. Please try again later.');
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return (
    <Container className="text-center mt-5">
      <Spinner animation="border" role="status" className="loading-spinner">
        <span className="visually-hidden">Loading teams...</span>
      </Spinner>
      <h2 className="mt-3">Loading teams...</h2>
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
          <h1 className="section-title display-4 text-center mb-4">Teams</h1>
          <Card>
            <Card.Body>
              {teams.length === 0 ? (
                <Alert variant="info">No teams found.</Alert>
              ) : (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Total Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams.map((team) => (
                      <tr key={team.id}>
                        <td>{team.id}</td>
                        <td>{team.name}</td>
                        <td>{team.description}</td>
                        <td>{team.total_points}</td>
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

export default Teams;

export default Teams;
