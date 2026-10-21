// customers.js
// Insert API for the "customer" table in Supabase.
// Put this file in the same folder as your index.js (the user-api project).

const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const router = express.Router();

// The URL and secret key come from Render's Environment settings (NOT typed in here).
// If they are missing, the rest of your API still starts normally.
const supabase =
  process.env.SUPABASE_URL && process.env.SUPABASE_SECRET_KEY
    ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY)
    : null;

// ---------------------------------------------------------------
// POST /customers  ->  INSERT a new customer
// Body (JSON): { customerid, lastname, firstname, mobileno, address }
// ---------------------------------------------------------------
router.post('/', async (req, res) => {
  if (!supabase) {
    return res.status(500).json({
      success: false,
      message: 'Server is missing SUPABASE_URL or SUPABASE_SECRET_KEY settings.'
    });
  }

  const { customerid, lastname, firstname, mobileno, address } = req.body || {};

  // Make sure every field was sent
  if (
    customerid === undefined || customerid === '' ||
    !lastname || !firstname || !mobileno || !address
  ) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required: customerid, lastname, firstname, mobileno, address'
    });
  }

  const { data, error } = await supabase
    .from('customer')
    .insert([{ customerid, lastname, firstname, mobileno, address }])
    .select();

  if (error) {
    // Example: duplicate customerid, wrong data type, etc.
    return res.status(400).json({ success: false, message: error.message });
  }

  return res.status(201).json({
    success: true,
    message: 'Customer inserted successfully',
    data: data
  });
});

// ---------------------------------------------------------------
// GET /customers  ->  list all customers (handy to double-check inserts)
// ---------------------------------------------------------------
router.get('/', async (req, res) => {
  if (!supabase) {
    return res.status(500).json({
      success: false,
      message: 'Server is missing SUPABASE_URL or SUPABASE_SECRET_KEY settings.'
    });
  }

  const { data, error } = await supabase
    .from('customer')
    .select('*')
    .order('customerid', { ascending: true });

  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  return res.json(data);
});

module.exports = router;
