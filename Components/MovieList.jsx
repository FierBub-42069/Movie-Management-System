import React, { useState, useEffect } from "react";
import { Table, Button, Container, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getMovies, deleteMovie } from "./Services/ApiService";
import { toast } from "react-toastify";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [movieIdToDelete, setMovieIdToDelete] = useState(null);

  // Effect for fetching movies from database
  useEffect(() => {
    fetchMovies();
  }, []);

  // Function for fetching movies from database
  const fetchMovies = async () => {
    const response = await getMovies();
    setMovies(response.data);
  };

  // Function for handling the deletion of a movie entry from the database
  const handleDelete = async (id) => {
    setMovieIdToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    toast.success(`Movie with ID ${movieIdToDelete} deleted successfully.`);
    await deleteMovie(movieIdToDelete);
    fetchMovies();
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  return (
    <Container>
      <h2 className="my-4">List of Movies</h2>
      <Button as={Link} to="/add-movie" variant="primary" className="mb-3">
        {" "}
        Add Movie{" "}
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Director</th>
            <th>Category</th>
            <th>Release Year</th>
            <th>Language</th>
            <th>Certification</th>
            <th>Awards</th>
            <th>Views</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.title}</td>
              <td>{movie.director}</td>
              <td>{movie.category}</td>
              <td>{movie.releaseYear}</td>
              <td>{movie.language}</td>
              <td>{movie.certification}</td>
              <td>{movie.awards}</td>
              <td>{movie.views}</td>
              <td>
                <Button
                  as={Link}
                  to={`/edit-movie/${movie.id}`}
                  variant="warning"
                  className="mr-2"
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(movie.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered className="modal-container">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this movie with ID {movieIdToDelete}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MovieList;
