import React from 'react';
import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Grid,
  Chip,
} from '@mui/material';
import {
  Build,
  DirectionsCar,
  LocalGasStation,
  Engineering,
  Speed,
  Security,
} from '@mui/icons-material';

export const config: ViewConfig = {
  menu: { order: 0, icon: 'line-awesome/svg/home-solid.svg' },
  title: 'Taller',
};

export default function HomeView() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          textAlign: 'center',
          mb: 4,
          animation: 'fadeIn 1s ease-in',
          '@keyframes fadeIn': {
            '0%': { opacity: 0, transform: 'translateY(20px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' }
          }
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 2,
            color: 'primary.main',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
          }}
        >
          Taller Mecánico Profesional
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            color: 'text.secondary',
            mb: 3
          }}
        >
          Diagnóstico · Mantenimiento · Reparación
        </Typography>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={8}>
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
              background: 'linear-gradient(to bottom right, #f5f9ff, #ffffff)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.15)'
              }
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="h5"
                component="h3"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: 'primary.dark'
                }}
              >
                <Build sx={{ verticalAlign: 'middle', mr: 1 }} />
                Servicio Completo para tu Vehículo
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  lineHeight: 1.6
                }}
              >
                Todo lo que tu auto necesita en un solo lugar.
                Mantenimiento preventivo, reparaciones mecánicas y diagnóstico computarizado.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Chip
                  icon={<Engineering />}
                  label="Mecánica General"
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  icon={<DirectionsCar />}
                  label="Frenos"
                  color="secondary"
                  variant="outlined"
                />
                <Chip
                  icon={<LocalGasStation />}
                  label="Motor"
                  color="success"
                  variant="outlined"
                />
                <Chip
                  icon={<Speed />}
                  label="Suspensión"
                  color="warning"
                  variant="outlined"
                />
                <Chip
                  icon={<Security />}
                  label="Diagnóstico"
                  color="info"
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{
        mt: 5,
        textAlign: 'center',
        opacity: 0.8,
        '&:hover': { opacity: 1 }
      }}>
        <Typography
          variant="caption"
          display="block"
          sx={{ mt: 2, fontStyle: 'italic' }}
        >
          Calidad y confianza para tu vehículo
        </Typography>
      </Box>
    </Container>
  );
}