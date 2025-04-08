import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Card, Spinner, Alert, Badge } from 'react-bootstrap';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://ideal-space-eureka-64v95r4wg9wcrx4j-8000.app.github.dev/api/users/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load users. Please try again later.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return (
    <Container className="text-center mt-5">
      <Spinner animation="border" role="status" className="loading-spinner">
        <span className="visually-hidden">Loading users...</span>
      </Spinner>
      <h2 className="mt-3">Loading users...</h2>
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
          <h1 className="section-title display-4 text-center mb-4">Users</h1>
          <Card>
            <Card.Body>
              {users.length === 0 ? (
                <Alert variant="info">No users found.</Alert>
              ) : (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Team</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          {user.team ? (
                            <Badge bg="info" text="dark">{user.team.name}</Badge>
                          ) : (
                            <Badge bg="secondary">No Team</Badge>
                          )}
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

export default Users;

export default Users;
