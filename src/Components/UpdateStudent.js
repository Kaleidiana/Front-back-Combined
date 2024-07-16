import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const UpdateStudent = () => {
  const { _id } = useParams(); // Get _id from URL params
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    _id: '',
    firstname: '',
    lastname: '',
    gender: '',
  });

  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:4000/getStudent/${_id}`);
        const studentData = response.data;
        setData({
          _id: studentData._id,
          firstname: studentData.firstname,
          lastname: studentData.lastname,
          gender: studentData.gender,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student:', error);
        setLoading(false);
      }
    };

    fetchStudent();
  }, [_id]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Update student data in MongoDB via PATCH request
      await axios.patch(`http://localhost:4000/updateStudent/${_id}`, data);

      // Update local state with new data
      setData(data); // Optionally update local state if needed

      // Display success toast
      toast.success('Student updated successfully', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });

      // Example: Reload list of students after update (assuming you have a function for this)
      // reloadStudents(); // You should implement a function to reload the list of students from the server
    } catch (error) {
      console.error('Error updating student:', error);
      toast.error('An error occurred while updating the student', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <h3 className="createHeading">Update Student</h3>
        <Form.Group className="mb-3" controlId="student_id">
          <Form.Label>Student ID:</Form.Label>
          <Form.Control
            type="text"
            value={data._id}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="firstname">
          <Form.Label>Firstname:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Firstname"
            value={data.firstname}
            onChange={handleChange}
            name="firstname"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="lastname">
          <Form.Label>Lastname:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Lastname"
            value={data.lastname}
            onChange={handleChange}
            name="lastname"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="gender">
          <Form.Label>Gender:</Form.Label>
          <Form.Control
            as="select"
            value={data.gender}
            onChange={handleChange}
            name="gender"
            required
          >
            <option value="">--Select Gender--</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Student
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default UpdateStudent;
