import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('https://ideal-space-eureka-64v95r4wg9wcrx4j-8000.app.github.dev/api/activities/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setActivities(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError('Failed to load activities. Please try again later.');
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return (
    <Container className="text-center mt-5">
      <Spinner animation="border" role="status" className="loading-spinner">
        <span className="visually-hidden">Loading activities...</span>
      </Spinner>
      <h2 className="mt-3">Loading activities...</h2>
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
          <h1 className="section-title display-4 text-center mb-4">Activities</h1>
          <Card>
            <Card.Body>
              {activities.length === 0 ? (
                <Alert variant="info">No activities found.</Alert>
              ) : (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activities.map((activity) => (
                      <tr key={activity.id}>
                        <td>{activity.id}</td>
                        <td>{activity.name}</td>
                        <td>{activity.description}</td>
                        <td>{activity.points}</td>
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

export default Activities;

export default Activities;
