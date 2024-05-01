


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import Divider from '@mui/material/Divider';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import LanguageIcon from '@mui/icons-material/Language';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

// import { ToastContainer, toast } from 'material-react-toastify';
// import 'material-react-toastify/dist/ReactToastify.css';



function Home() {
  const [prof, setProf] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setProf(response.data))
      .catch(error => console.error( error));
  }, []);

  const deleteProfile = (id) => {
    setProf(prof.filter(user => user.id !== id)); 
  };

  const editProfile = (editedProfile) => {
    setProf(prof.map(user => user.id === editedProfile.id ? editedProfile : user));
  };

  return (
    <div style={{  marginTop:10 ,display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
      {prof.map(user => (
        <ProfileCard key={user.id} user={user} onDelete={deleteProfile} onEdit={editProfile} /> 
      ))}
    </div>
  );
}


function ProfileCard({ user, onDelete, onEdit }) {
  const [Like, setLike] = useState(false);
  const [editOpen, seteditOpen] = useState(false);

  const likeBtn = () => {
    setLike(prev => !prev); // toggle kare btn based on true false
  };

  const editBtn = () => {
    seteditOpen(!editOpen);
  };

  return (
    <Card sx={{ maxWidth: 345, marginRight: 2, marginBottom: 2 , }}>
      <CardMedia
        sx={{
          height: 160,
          width: 160,
          marginLeft: 5,
          backgroundColor: 'lightgray !important' 
        }}
        image={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}
        title="Avatar"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user.name}
        </Typography>
        <Box display="flex" alignItems="center">
          <MailOutlineIcon sx={{ marginRight: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <PhoneEnabledIcon sx={{ marginRight: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {user.phone}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <LanguageIcon sx={{ marginRight: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {user.website}
          </Typography>
        </Box>
      </CardContent>
      <Box >
        <BottomNavigation showLabels sx={{ backgroundColor: 'lightgray' }}>
          <BottomNavigationAction
            icon={Like ? <FavoriteIcon color='error' /> : <FavoriteBorderOutlinedIcon color='error' />}
            onClick={likeBtn}
          />
          <Divider orientation="vertical" variant="middle" flexItem />
          <BottomNavigationAction icon={<BorderColorOutlinedIcon />} onClick={editBtn} />
          <Divider orientation="vertical" variant="middle" flexItem />
          <BottomNavigationAction icon={<DeleteIcon />} onClick={() => onDelete(user.id)} />
        </BottomNavigation>
      </Box>
      <EditPopup isOpen={editOpen} onClose={editBtn} user={user} onEdit={onEdit} />
    </Card>
  );
}

function EditPopup({ isOpen, onClose, user, onEdit }) {
  const [editedProfile, seteditedProfile] = useState({ ...user });

  const handleClose = () => {
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    seteditedProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const editProfile = () => {
    onEdit(editedProfile);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>
        Basic Model
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent >
        <label htmlFor="email">Name:</label>
        <TextField
          fullWidth
          margin="normal"
          id='email'
          type='email'
          name="name"
          value={editedProfile.name}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email:</label>
        <TextField
          fullWidth
          margin="normal"
          name="email"
          value={editedProfile.email}
          onChange={handleInputChange}
        />
        Phone: <TextField
          fullWidth
          margin="normal"
          name="phone"
          value={editedProfile.phone}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Website:</label>
        <TextField
          fullWidth
          margin="normal"
          name="website"
          value={editedProfile.website}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={editProfile}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}
export default Home; 
