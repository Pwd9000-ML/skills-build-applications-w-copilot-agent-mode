import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col } from 'react-bootstrap';

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

  if (loading) return <div className="text-center mt-5"><h2>Loading workouts...</h2></div>;
  if (error) return <div className="text-center mt-5 text-danger"><h2>{error}</h2></div>;

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1 className="text-center mb-4">Workouts</h1>
          {workouts.length === 0 ? (
            <p className="text-center">No workouts found.</p>
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
                    <td>{workout.activity ? workout.activity.name : 'Unknown'}</td>
                    <td>{new Date(workout.date).toLocaleDateString()}</td>
                    <td>{workout.duration}</td>
                    <td>{workout.points_earned}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Workouts;
