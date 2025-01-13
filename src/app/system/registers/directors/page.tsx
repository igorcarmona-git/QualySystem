'use client';

import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { directorSchema } from "@/utils/validations/directorSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Inferindo os tipos com base no esquema Zod
import { z } from "zod";
type DirectorForm = z.infer<typeof directorSchema>;

export default function DirectorReg() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DirectorForm>({
    resolver: zodResolver(directorSchema),
  });

  // Função chamada ao enviar o formulário
  const onSubmit = (data: DirectorForm) => {
    console.log("Dados enviados:", data);
  };

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          bgcolor: "white",
          p: 3,
          borderRadius: 1,
          boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        {/* Título */}
        <Typography variant="h5" fontWeight="bold" gutterBottom marginBottom={4}>
          Registrar Diretoria
        </Typography>

        {/* Formulário */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* Campo: Data da Ocorrência */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Data da Ocorrência"
                type="date"
                InputLabelProps={{ shrink: true }}
                {...register("description")} // Registro do campo
                error={!!errors.description} // Indica se há erro
                helperText={errors.description?.message} // Exibe a mensagem de erro
              />
            </Grid>

            {/* Campo: Hora da Ocorrência */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Hora da Ocorrência"
                type="time"
                InputLabelProps={{ shrink: true }}
                {...register("id_user_responsible")} // Registro do campo
                error={!!errors.id_user_responsible} // Indica se há erro
                helperText={errors.id_user_responsible?.message} // Exibe a mensagem de erro
              />
            </Grid>
          </Grid>

          {/* Botão de Envio */}
          <Box mt={4} display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" color="primary">
              Enviar
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
