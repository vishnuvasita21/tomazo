import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const MenuTypes = () => {
    const menuTypes = [
      { id: 1, name: 'Starters' },
      { id: 2, name: 'Desserts' },
      { id: 3, name: 'Main Course' },
    ];

  return (
    <div>
      <h1>Menu</h1>

      <Grid container spacing={3}>
        {menuTypes.map(item => (
          <Grid key={item.id} item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  <Link
                    to={{
                      pathname: '/menuItems',
                      search: `?name=${encodeURIComponent(item.name)}`,
                    }}
                  >
                    {item.name}
                  </Link>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MenuTypes;
