'use client'

import { useState, useEffect } from 'react'
import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material'
import { firestore } from '@/firebase'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
}

const item = [
  'tomato',
  'potato',
  'onion',
  'ginger',
  'garlic',
  'apple']

export default function Home() {
  // We'll add our component logic here
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'items'));
      const itemsList = querySnapshot.docs.map(doc => doc.data().name);
      setItems(itemsList);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddItem = async () => {
    if (newItem.trim()) {
      try {
        await setDoc(doc(firestore, 'items', newItem), { name: newItem });
        setNewItem('');
        fetchItems();
        handleClose();
      } catch (error) {
        console.error('Error adding item:', error);
      }
    }
  };
  return (
    <Box
    width="100vw"
    height="100vh"
    display={'flex'}
    justifyContent={'center'}
    alignItems={'center'}>
      <Box width="800px"
      height="600px"></Box>
      <Typography variant="h1">Inventory Management</Typography>
    </Box>
  )
}