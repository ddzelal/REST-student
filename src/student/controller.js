const pool = require('../../db');
const queries = require('./queries');

const getStudents = (req, res) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getStudentsById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getStudentsById, [id], (error, result) => {
    if (error) throw error;
    res.status(200).json(result.rows);
  });
};

const addStudent = (req, res) => {
  const { name, email, age, dob } = req.body;
  //check if email exists

  pool.query(queries.checkEmailExist, [email], (error, result) => {
    if (result.rows.length) {
      res.send('Email already exist');
    }
    pool.query(queries.addStudent, [name, email, age, dob], (error, result) => {
      if (error) throw error;
      res.status(201).send('Student Created Successfully');
    });
  });
};

const deleteStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentsById, [id], (error, result) => {
    const noStudentFound = !result.rows.length;
    if (noStudentFound) {
      res.send('Student does not exist in the database');
    }

    pool.query(queries.deleteStudentById, [id], (error, result) => {
      if (error) throw error;
      res.status(200).send('Student removed successfully');
    });
  });
};

const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  pool.query(queries.getStudentsById, [id], (error, result) => {
    const noStudentFound = !result.rows.length;
    if (noStudentFound) {
      res.send('Student does not exist in the database');
    }
    pool.query(queries.updateStudent, [name, id], (error, result) => {
      if (error) throw error;
      res.status(200).send('Student update successfully');
    });
  });
};

module.exports = {
  getStudents,
  getStudentsById,
  addStudent,
  deleteStudentById,
  updateStudent,
};
