'use client'

import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material';
import { firestore } from '@/firebase';
import { collection, getDocs, query, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import React from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

const backgroundImageStyle = {
  width: '100vw',
  height: '100vh',
  backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1682146353936-30c121b55131?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3RvcmFnZXxlbnwwfHwwfHx8MA%3D%3D)', 
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

export default function Home() {
  const [pantry, setPantry] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPantry, setFilteredPantry] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [itemName, setItemName] = useState('');

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry'));
    const docs = await getDocs(snapshot);
    const pantryList = [];
    docs.forEach((doc) => {
      pantryList.push({ name: doc.id, ...doc.data() });
    });
    setPantry(pantryList);
    setFilteredPantry(pantryList); // Initialize filtered pantry with the full list
  }

  useEffect(() => {
    updatePantry();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredPantry(
        pantry.filter(({ name }) => 
          name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredPantry(pantry);
    }
  }, [searchQuery, pantry]);

  const addItem = async (item) => {
    if (item.trim()) { 
      const docRef = doc(collection(firestore, 'pantry'), item);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const { count } = docSnap.data();
        await setDoc(docRef, { count: count + 1 });
      } else {
        await setDoc(docRef, { count: 1 });
      }
      await updatePantry();
    }
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { count } = docSnap.data();
      if (count === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { count: count - 1 });
      }
    }
    await updatePantry();
  }

  const incrementItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { count } = docSnap.data();
      await setDoc(docRef, { count: count + 1 });
    }
    await updatePantry();
  }

  return (
    <Box sx={backgroundImageStyle}
      width="100vw"
      height="100vh"
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      gap={2}
      flexDirection={'column'}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction={'row'} spacing={2}>
            <TextField 
              id="outlined-basic" 
              label="Item" 
              variant="outlined" 
              fullWidth 
              value={itemName} 
              onChange={(e) => setItemName(e.target.value)} 
            />
            <Button 
              variant="outlined"
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant="contained" onClick={handleOpen}>Add Item</Button>
      
      <TextField
        id="search-bar"
        label="Search Pantry Items"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ 
          mb: 2, 
          backgroundColor: 'white', 
          '& .MuiOutlinedInput-root': { 
            backgroundColor: 'white' 
          } 
        }}
      />

      <Box border={'1px solid #333'}>
        <Box 
          width="800px" 
          height="100px" 
          bgcolor={'#964B00'} 
          justifyContent={'center'} 
          alignItems={'center'}
        >
          <Typography variant={'h2'} color={'#f0f0f0'} textAlign={'center'}>
            Pantry Storage
          </Typography>
        </Box>
        <Stack 
          width="800px" 
          height="500px" 
          spacing={2} 
          overflow={'auto'}
        >
          {filteredPantry.map(({ name, count }) => (
            <Box 
              key={name} 
              width="100%"
              height="100px"  // Adjust height as needed
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bgcolor="#f0f0f0"
              paddingX={5}
              paddingY={2}  // Add vertical padding if needed
            >
              <Typography
                variant={'h3'}
                color={'#333'}
                textAlign={'center'}
                flexGrow={1}  // Ensure the text takes available space
              >
                {typeof name === 'string' ? name.charAt(0).toUpperCase() + name.slice(1) : 'Unknown'}
              </Typography>

              <Typography variant={'h3'} color={'#333'} textAlign={'center'} marginX={2}>
                Quantity: {count || 0}
              </Typography>

              <Stack direction="row" spacing={1}>
                <Button variant="contained" onClick={() => incrementItem(name)}>Add</Button>
                <Button variant="contained" color="error" onClick={() => removeItem(name)}>Remove</Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}