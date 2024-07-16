import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import {
  getMovieById,
  addMovie,
  updateMovie,
  getCategories,
  getLanguages,
} from "./Services/ApiService";
import { toast } from "react-toastify";

// Movie form component for adding or editing movies in database
const MovieForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [category, setCategory] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [language, setLanguage] = useState("");
  const [certification, setCertification] = useState("");
  const [awards, setAwards] = useState("");
  const [views, setViews] = useState("");
  const [categories, setCategories] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Effect for fetching movie from database
  useEffect(() => {
    fetchCategories();
    fetchLanguages();
    if (id) {
      fetchMovie(id);
    }
  }, [id]);

  // Function for fetching categories for dropdown in form
  const fetchCategories = async () => {
    const response = await getCategories();
    setCategories(response.data);
  };

  // Function for fetching langages for dropdown in form
  const fetchLanguages = async () => {
    const response = await getLanguages();
    setLanguages(response.data);
  };

  // Function for fetching movie with its respective ID from database for editing
  const fetchMovie = async (id) => {
    const response = await getMovieById(id);
    setTitle(response.data.title);
    setDirector(response.data.director);
    setCategory(response.data.category);
    setReleaseYear(response.data.releaseYear);
    setLanguage(response.data.language);
    setCertification(response.data.certification);
    setAwards(response.data.awards);
    setViews(response.data.views);
  };

  // Function for validation of form entries
  const validateForm = () => {
    const newErrors = {};

    if (!title) newErrors.title = "Movie title is required";
    if (!director) newErrors.director = "Director is required";
    if (!category) newErrors.category = "Category is required";
    if (!releaseYear) newErrors.releaseYear = "Release year is required";
    if (!language) newErrors.language = "Language is required";
    if (!certification) newErrors.certification = "Certification is required";
    if (!awards) newErrors.awards = "Awards are required";
    if (!views) newErrors.views = "Number of views is required";
    if (isNaN(views) || views <= 0)
      newErrors.views = "Views must be a positive number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function for handling form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const movie = {
        title,
        director,
        category,
        releaseYear,
        language,
        certification,
        awards,
        views,
      };
      try {
        if (id) {
          toast.success(`Movie with ID ${id} updated successfully.`);
          await updateMovie(movie, id);
        } else {
          toast.success(`Movie added successfully.`);
          await addMovie(movie);
        }
        navigate("/movies");
      } catch (error) {
        console.error(`Error adding or updating post: ${error}`);
      }
    }
  };

  // Function for preventing numbers from getting entered in director input field
  const preventNumbers = () => {
    const regex = /^[a-zA-Z\s.'\-,\u00C0-\u00FF]+$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    } else {
      return;
    }
  };

  // Function for resetting form entries
  const resetForm = () => {
    setTitle("");
    setDirector("");
    setCategory("");
    setReleaseYear("");
    setLanguage("");
    setCertification("");
    setAwards("");
    setViews("");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit} className="form" formNoValidate>
        <h2 className="my-4"> {id ? "Edit" : "Add"} Movie </h2>
        <Form.Group controlId="formTitle">
          <Form.Label>Movie Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            placeholder="Movie Title"
            onChange={(event) => setTitle(event.target.value)}
            isInvalid={!!errors.title}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.title}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formDirector">
          <Form.Label>Movie Director</Form.Label>
          <Form.Control
            type="text"
            value={director}
            placeholder="Movie Director"
            onKeyDown={preventNumbers}
            onChange={(event) => setDirector(event.target.value)}
            isInvalid={!!errors.director}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.director}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formCategory">
          <Form.Label>Category</Form.Label>
          {/* Code for creating a dropdown of categories taken from database */}
          <Form.Control
            as="select"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            isInvalid={!!errors.category}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {Form.category}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formReleaseYear">
          <Form.Label>Release Year</Form.Label>
          <Form.Control
            as="select"
            value={releaseYear}
            onChange={(event) => setReleaseYear(event.target.value)}
            isInvalid={!!errors.releaseYear}
            required
          >
            <option value="">Select Year</option>
            {/* Code for obtaining array containing years from current year, going back 100 years, for dropdown. */}
            {/* Each oprtion represents a year in descending order. */}
            {Array.from(
              new Array(100),
              (_, i) => new Date().getFullYear() - i
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.releaseYear}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formLanguage">
          <Form.Label>Language</Form.Label>
          {/* Code for creating a dropdown of languages taken from database */}
          <Form.Control
            as="select"
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            isInvalid={!!errors.language}
            required
          >
            <option value="">Select Language</option>
            {languages.map((lang, index) => (
              <option key={index} value={lang}>
                {lang}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.language}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formCertification">
          <Form.Label>Certification</Form.Label>
          <Form.Check
            type="radio"
            label="U"
            name="certification"
            value="U"
            checked={certification === "U"}
            onChange={(event) => setCertification(event.target.value)}
            isInvalid={!!errors.certification}
            required
          />
          <Form.Check
            type="radio"
            label="UA"
            name="certification"
            value="UA"
            checked={certification === "UA"}
            onChange={(event) => setCertification(event.target.value)}
            isInvalid={!!errors.certification}
            required
          />
          <Form.Check
            type="radio"
            label="A"
            name="certification"
            value="A"
            checked={certification === "A"}
            onChange={(event) => setCertification(event.target.value)}
            isInvalid={!!errors.certification}
            required
          />
          <Form.Check
            type="radio"
            label="S"
            name="certification"
            value="S"
            checked={certification === "S"}
            onChange={(event) => setCertification(event.target.value)}
            isInvalid={!!errors.certification}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.certification}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formAwards">
          <Form.Label>Awards</Form.Label>
          <Form.Control
            as="textarea"
            value={awards}
            placeholder="Awards"
            onChange={(event) => setAwards(event.target.value)}
            isInvalid={!!errors.awards}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.awards}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formViews">
          <Form.Label>Number of Views</Form.Label>
          <Form.Control
            type="number"
            value={views}
            placeholder="Views"
            onChange={(event) => setViews(event.target.value)}
            isInvalid={!!errors.views}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.views}
          </Form.Control.Feedback>
        </Form.Group>
        <div className="d-flex align-items-center justify-content-center">
          <Button variant="primary" type="submit">
            Save
          </Button>
          <Button
            variant="secondary"
            type="reset"
            className="ml-5"
            onClick={resetForm}
          >
            Reset
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default MovieForm;
