import React, { useState, useCallback } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import {
  Container,
  TextField,
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import About from './assets/about.jpg';
import One from './assets/1.jpg';
import Two from './assets/2.jpg';
import Three from './assets/3.jpg';
import Four from './assets/4.jpg';
import Five from './assets/5.jpg';
import Six from './assets/6.jpeg';
import Seven from './assets/7.jpeg';
import Eight from './assets/8.jpeg';
import Nine from './assets/9.jpeg';
import Ten from './assets/10.jpeg';
import Temi from './assets/temi.jpg'
import { useMediaQuery } from '@mui/material';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';

const initialImages = [
  { id: '0', src: About, alt: 'About', tag: 'Thinker' },
  { id: '1', src: One, alt: 'Paint', tag: 'Paint' },
  { id: '2', src: Two, alt: 'City', tag: 'City' },
  { id: '3', src: Three, alt: 'Tree', tag: 'Tree' },
  { id: '4', src: Four, alt: 'Black', tag: 'Black' },
  { id: '5', src: Five, alt: 'Fire', tag: 'Fire' },
  { id: '6', src: Six, alt: 'Africa', tag: 'Africa' },
  { id: '7', src: Seven, alt: 'Beach', tag: 'Beach' },
  { id: '8', src: Eight, alt: 'Picnic', tag: 'Picnic' },
  { id: '9', src: Nine, alt: 'Kitchen', tag: 'Kitchen' },
  { id: '10', src: Ten, alt: 'Women', tag: 'Women' },
  { id: '11', src: Temi, alt: 'Temi', tag: 'Temi' },
 ];

const Image = ({ src, alt, id, tag }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
  });

  const { setNodeRef: setDropRef } = useDroppable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? 'none' : 'transform 0.3s',
    boxShadow: isDragging ? '0px 0px 10px rgba(0, 0, 0, 0.3)' : 'none',
    borderRadius: '10px',
    touchAction: 'none',
  };

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        setDropRef(node);
      }}
      {...attributes}
      {...listeners}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.3s',
          borderRadius: '10px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '4px 8px',
          borderRadius: '4px',
        }}
      >
        {tag}
      </div>
    </div>
  );
};

const DraggableImageGrid = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [images, setImages] = useState(initialImages);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const onDragEnd = ({ active, over }) => {
    if (active && over && active.id !== over.id) {
      const fromIndex = images.findIndex((img) => img.id === active.id);
      const toIndex = images.findIndex((img) => img.id === over.id);
      const movedImage = images[fromIndex];
      const updatedImages = [...images];

      updatedImages.splice(fromIndex, 1);
      updatedImages.splice(toIndex, 0, movedImage);
      setImages(updatedImages);
    }
  };

  const filteredImages = useCallback(() => {
    const filtered = images.filter((image) =>
      image.tag.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filtered;
  }, [images, searchQuery]);

  const handleSearch = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000); 
  };

  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase(); 
    setSearchQuery(query);

    handleSearch();

    if (query.trim() !== '' && filteredImages().length === 0) {
      toast.error('No images found for the given search query', {
        autoClose: 2000,
      });
    }
  };

  return (
    <DndContext onDragEnd={onDragEnd}>
      <Container>
        <Container
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'column',
          }}
        >
          
        
          <TextField
            label="Search Images"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleInputChange}
            style={{ marginTop: '1rem', width: '50%', marginBottom: '2rem' }}
          />
        </Container>
        <div>
          <Container
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '1rem',
              margin: '0 auto',
              width: '100%',
              maxWidth: !isSmallScreen ? '90%' : '700px',
              height: 'auto',
        
              padding: '1rem',
              backgroundColor: '',
              borderRadius: '.6rem',
            }}
          >
            {loading ? (
              <Spinner />
            ) : (
              filteredImages().map((image, index) => (
                <Image
                  key={`image-${index}`}
                  src={image.src}
                  alt={image.alt}
                  id={image.id}
                  tag={image.tag}
                  index={index}
                  handleDragEnd={onDragEnd}
                />
              ))
            )}

            <button style={{height: '2rem', width: '4rem', color: 'Black',  margin: '2rem 0', border: 'none', borderRadius: '.2rem' }}>
                <Link to='/' style={{textDecoration: 'none', color: 'inherit'}}>logout</Link>
            </button>
          </Container>
        </div>
      </Container>
    </DndContext>
  );
};

export default DraggableImageGrid;