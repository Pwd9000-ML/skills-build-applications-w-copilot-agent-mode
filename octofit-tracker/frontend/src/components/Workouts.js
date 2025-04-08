import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Card, Spinner, Alert, Badge } from 'react-bootstrap';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('https://ideal-space-eureka-64v95r4wg9wcrx4j-8000.app.github.dev/api/workouts/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setWorkouts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching workouts:', error);
        setError('Failed to load workouts. Please try again later.');
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) return (
    <Container className="text-center mt-5">
      <Spinner animation="border" role="status" className="loading-spinner">
        <span className="visually-hidden">Loading workouts...</span>
      </Spinner>
      <h2 className="mt-3">Loading workouts...</h2>
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
          <h1 className="section-title display-4 text-center mb-4">Workouts</h1>
          <Card>
            <Card.Body>
              {workouts.length === 0 ? (
                <Alert variant="info">No workouts found.</Alert>
              ) : (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>User</th>
                      <th>Activity</th>
                      <th>Date</th>
                      <th>Duration (min)</th>
                      <th>Points Earned</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workouts.map((workout) => (
                      <tr key={workout.id}>
                        <td>{workout.id}</td>
                        <td>{workout.user ? workout.user.name : 'Unknown'}</td>
                        <td>
                          {workout.activity ? (
                            <Badge bg="info" text="dark">{workout.activity.name}</Badge>
                          ) : (
                            'Unknown'
                          )}
                        </td>
                        <td>{new Date(workout.date).toLocaleDateString()}</td>
                        <td>{workout.duration}</td>
                        <td>
                          <Badge bg="success" pill>{workout.points_earned}</Badge>
                        </td>
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

export default Workouts;

export default Workouts;
