'use client';

import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Radio,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import { AGE_RANGE, DAMAGE_DEGREE, PATIENT_RACE, SECTORS, TYPE_NOTIFICATION } from "@/utils/constants";
import { notifySchema } from "@/utils/validations/notifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Inferindo os tipos com base no schema Zod
type NotifyForm = z.infer<typeof notifySchema>;

const defaultValues = notifySchema.parse({});

export default function NotifyReg() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<NotifyForm>({
    resolver: zodResolver(notifySchema),
    defaultValues: defaultValues,
    mode: "onSubmit",
  });

   // Observação de campos para validações condicionais
   const sectorNotify = watch("sectorNotify");
   const sectorNotified = watch("sectorNotified");
   const typeNotify = watch("typeNotify");

  // Validations
  const isSectorsEqual: boolean = 
    sectorNotify === sectorNotified && sectorNotify !== '';
  const isNotifyNC: boolean = typeNotify === "Não conformidade";

  // Função para envio dos dados
  const onSubmit = (data: NotifyForm) => {
    console.log("Dados validados:", data);
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
          Registrar Notificação
        </Typography>
        
        {/* Formulário */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* Data e Hora da Ocorrência */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Data da Ocorrência"
                type="date"
                InputLabelProps={{ shrink: true }}
                {...register("dateOccurrence")}
                error={!!errors.dateOccurrence}
                helperText={errors.dateOccurrence?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Hora da Ocorrência"
                type="time"
                InputLabelProps={{ shrink: true }}
                {...register("timeOccurrence")}
                error={!!errors.timeOccurrence}
                helperText={errors.timeOccurrence?.message}
              />
            </Grid>

            {/* Tipo de Notificação */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="typeNotifyLabel">Tipo de Notificação</InputLabel>
                <Select
                  labelId="typeNotifyLabel"
                  label="Tipo de Notificação"
                  {...register("typeNotify")}
                  error={!!errors.typeNotify}
                >
                  {TYPE_NOTIFICATION.map((type) => (
                    <MenuItem key={type.id} value={type.name}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.typeNotify && <FormHelperText error>{errors.typeNotify.message}</FormHelperText>}
              </FormControl>
            </Grid>

            {/* Nome do Paciente */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nome do Paciente"
                variant="outlined"
                {...register("patientName")}
                placeholder="Nome do paciente completo"
                error={!!errors.patientName}
                helperText={errors.patientName?.message}   
              />
            </Grid>

            {/* Sexo e Raça/Cor */}
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel id="patientSexLabel">Sexo</InputLabel>
                <Select
                  labelId="patientSexLabel"
                  label="Sexo"
                  {...register("patientSex")}
                  error={!!errors.patientSex}
                >
                  <MenuItem value="M">Masculino</MenuItem>
                  <MenuItem value="F">Feminino</MenuItem>
                </Select>
                {errors.patientSex && <FormHelperText error>{errors.patientSex.message}</FormHelperText>}
              </FormControl>
            </Grid>
            {!isNotifyNC && (
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                  <InputLabel id="patientRaceLabel">Raça/Cor</InputLabel>
                  <Select
                      fullWidth
                      labelId="patientRaceLabel"
                      label="Raça/Cor"
                      error={!!errors.patientRace}
                      {...register("patientRace")}
                  >
                  {PATIENT_RACE.map((race) => (
                      <MenuItem key={race.id} value={race.name}>
                          {race.name}
                      </MenuItem>
                  ))}
                  </Select>
                  {errors.patientRace && <FormHelperText error>{errors.patientRace.message}</FormHelperText>}
                </FormControl>
              </Grid>
            )}

            {/* Idade e Data de Internação */}
            {!isNotifyNC && (
              <>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="agePatientLabel">Idade</InputLabel>
                    <Select
                      labelId="agePatientLabel"
                      label="Idade"
                      {...register("patientAge")}
                      error={!!errors.patientAge}
                      >
                      {AGE_RANGE.map((age) => (
                          <MenuItem key={age.id} value={age.name}>
                              {age.name}
                          </MenuItem>
                      ))}
                    </Select>
                    {errors.patientAge && <FormHelperText error>{errors.patientAge.message}</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Data de Internação do Paciente"
                    type="date"
                    placeholder="DD/MM/AAAA"
                    InputLabelProps={{ shrink: true }}
                    {...register("admissionDate")}
                    error={!!errors.admissionDate}
                    helperText={errors.admissionDate?.message}
                  />
                </Grid>
              </>
            )}

            {/* Diagnóstico */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Diagnóstico"
                variant="outlined"
                placeholder="Diagnóstico do paciente"
                {...register("diagnostic")}
                error={!!errors.diagnostic}
                helperText={errors.diagnostic?.message}
              />
            </Grid>
            
            {/* Registro do Paciente */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Registro do Paciente"
                type="string"
                variant="outlined"
                placeholder="Digite apenas números do registro do paciente"
                {...register("registerPatient")}
                error={!!errors.registerPatient}
                helperText={errors.registerPatient?.message}
              />
            </Grid>

            {/* Tipo de Evento */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="eventTypeLabel">Tipo de Evento</InputLabel>
                <Select
                  labelId="eventTypeLabel"
                  label="Tipo de Evento"
                  {...register("eventType")}
                  error={!!errors.eventType}
                >
                  <MenuItem value="1">Evento 1</MenuItem>
                  <MenuItem value="2">Evento 2</MenuItem>
                </Select>
                {errors.eventType && <FormHelperText error>{errors.eventType.message}</FormHelperText>}
              </FormControl>
            </Grid>

            {/* Grau do Dano */}
            {!isNotifyNC && (
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="damageDegreeLabel">Grau do Dano</InputLabel>
                  <Select
                    labelId="damageDegreeLabel"
                    label="Grau do Dano"
                    {...register("damageDegree")}
                    error={!!errors.damageDegree}
                  >
                    {DAMAGE_DEGREE.map((degree) => (
                      <MenuItem key={degree.id} value={degree.name}>
                        {degree.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.damageDegree && <FormHelperText error>{errors.damageDegree.message}</FormHelperText>}
                </FormControl>
              </Grid>
            )}

            {/* Título e Descrição */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Título"
                variant="outlined"
                placeholder="Título da notificação"
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descrição"
                variant="outlined"
                multiline
                rows={4}
                placeholder="Descreva o incidente com detalhes"
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Grid>

            {/* Notificante e Notificado */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="sectorNotifyLabel">Setor notificante</InputLabel>
                <Select
                  labelId="sectorNotifyLabel"
                  label="Setor notificante"
                  {...register("sectorNotify")}
                  error={!!errors.sectorNotify}
                >
                  {SECTORS.map((sector) => (
                    <MenuItem key={sector.id} value={sector.name}>
                      {sector.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.sectorNotify && <FormHelperText error>{errors.sectorNotify.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="sectorNotifiedLabel">Setor notificado</InputLabel>
                <Select
                  labelId="sectorNotifiedLabel"
                  label="Setor notificado"
                  {...register("sectorNotified")}
                  error={!!errors.sectorNotified}
                >
                  {SECTORS.map((sector) => (
                    <MenuItem key={sector.id} value={sector.name}>
                      {sector.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.sectorNotified && <FormHelperText error>{errors.sectorNotified.message}</FormHelperText>}
              </FormControl>
              {isSectorsEqual && (
                <FormHelperText error>Os setores notificante e notificado devem ser diferentes.</FormHelperText>
              )}
            </Grid>

            {/* Envolvido no Incidente e Desejo Anonimato */}
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Estou Envolvido no Incidente</FormLabel>
                <RadioGroup
                  row
                  {...register("involved")}
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Sim" />
                  <FormControlLabel value="no" control={<Radio />} label="Não" />
                </RadioGroup>
              </FormControl>
              {errors.involved && <FormHelperText error>{errors.involved.message}</FormHelperText>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Desejo Manter Anonimato</FormLabel>
                <RadioGroup
                  row
                  {...register("anonymous")}
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Sim" />
                  <FormControlLabel value="no" control={<Radio />} label="Não" />
                </RadioGroup>
              </FormControl>
              {errors.anonymous && <FormHelperText error>{errors.anonymous.message}</FormHelperText>}
            </Grid>


            {/* Botão de Envio */}
            <Grid item xs={12}>
              <Button
                disabled={isSectorsEqual}
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                type="submit"
              >
                Enviar à Qualidade
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}
