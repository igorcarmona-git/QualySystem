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
import { defaultValuesNotifySchema, notifySchema } from "@/utils/validations/notifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from 'zod';

// Inferindo os tipos com base no schema Zod
type NotifyForm = z.infer<typeof notifySchema>;

export default function NotifyReg() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<NotifyForm>({
    resolver: zodResolver(notifySchema),
    defaultValues: defaultValuesNotifySchema,
  });

  const sectorNotify = watch("sectorNotify");
  const sectorNotified = watch("sectorNotified");
  const typeNotify = watch("typeNotify");

  const isSectorsEqual: boolean =
    sectorNotify === sectorNotified && sectorNotify !== 0;

  const isNotifyNC: boolean = typeNotify === "Não conformidade";

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
        <Typography variant="h5" fontWeight="bold" gutterBottom marginBottom={4}>
          Registrar Notificação
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* Date and Time of Occurrence */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="dateOccurrence"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Data da Ocorrência"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.dateOccurrence}
                    helperText={errors.dateOccurrence?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="timeOccurrence"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Hora da Ocorrência"
                    type="time"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.timeOccurrence}
                    helperText={errors.timeOccurrence?.message}
                  />
                )}
              />
            </Grid>

            {/* Type of Notification */}
            <Grid item xs={12}>
              <Controller
                name="typeNotify"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="typeNotifyLabel">Tipo de Notificação</InputLabel>
                    <Select
                      {...field}
                      labelId="typeNotifyLabel"
                      label="Tipo de Notificação"
                      error={!!errors.typeNotify}
                    >
                      {TYPE_NOTIFICATION.map((type) => (
                        <MenuItem key={type.id} value={type.name}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.typeNotify && <FormHelperText>{errors.typeNotify.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </Grid>

            {/* Patient Name */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="patientName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Nome do Paciente"
                    variant="outlined"
                    placeholder="Nome do paciente completo"
                    error={!!errors.patientName}
                    helperText={errors.patientName?.message}
                  />
                )}
              />
            </Grid>

            {/* Sex and Race Patient */}
            <Grid item xs={12} sm={3}>
              <Controller
                name="patientSex"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="patientSexLabel">Sexo</InputLabel>
                    <Select
                      {...field}
                      labelId="patientSexLabel"
                      label="Sexo"
                      error={!!errors.patientSex}
                    >
                      <MenuItem value="M">Masculino</MenuItem>
                      <MenuItem value="F">Feminino</MenuItem>
                    </Select>
                    {errors.patientSex && <FormHelperText>{errors.patientSex.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </Grid>
            {!isNotifyNC && (
              <Grid item xs={12} sm={3}>
                <Controller
                  name="patientRace"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="patientRaceLabel">Raça/Cor</InputLabel>
                      <Select
                        {...field}
                        labelId="patientRaceLabel"
                        label="Raça/Cor"
                        error={!!errors.patientRace}
                      >
                        {PATIENT_RACE.map((race) => (
                          <MenuItem key={race.id} value={race.name}>
                            {race.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.patientRace && <FormHelperText>{errors.patientRace.message}</FormHelperText>}
                    </FormControl>
                  )}
                />
              </Grid>
            )}

            {/* Age and Admission Date */}
            {!isNotifyNC && (
              <>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="patientAge"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel id="agePatientLabel">Idade</InputLabel>
                        <Select
                          {...field}
                          labelId="agePatientLabel"
                          label="Idade"
                          error={!!errors.patientAge}
                        >
                          {AGE_RANGE.map((age) => (
                            <MenuItem key={age.id} value={age.name}>
                              {age.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.patientAge && <FormHelperText>{errors.patientAge.message}</FormHelperText>}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="admissionDate"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Data de Internação do Paciente"
                        type="date"
                        placeholder="DD/MM/AAAA"
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.admissionDate}
                        helperText={errors.admissionDate?.message}
                      />
                    )}
                  />
                </Grid>
              </>
            )}
            {/* Diagnostic */}
            <Grid item xs={12}>
              <Controller
                name="diagnostic"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Diagnóstico"
                    variant="outlined"
                    placeholder="Diagnóstico do paciente"
                    error={!!errors.diagnostic}
                    helperText={errors.diagnostic?.message}
                  />
                )}
              />
            </Grid>

            {/* Patient Register */}
            <Grid item xs={12}>
              <Controller
                name="registerPatient"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Registro do Paciente"
                    type="string"
                    variant="outlined"
                    placeholder="Digite apenas números do registro do paciente"
                    error={!!errors.registerPatient}
                    helperText={errors.registerPatient?.message}
                  />
                )}
              />
            </Grid>

            {/* Type of Event */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="eventType"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="eventTypeLabel">Tipo de Evento</InputLabel>
                    <Select
                      {...field}
                      labelId="eventTypeLabel"
                      label="Tipo de Evento"
                      error={!!errors.eventType}
                    >
                      <MenuItem value="Evento 1">Evento 1</MenuItem>
                      <MenuItem value="Evento 2">Evento 2</MenuItem>
                    </Select>
                    {errors.eventType && <FormHelperText>{errors.eventType.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </Grid>

            {/* Damage Degree */}
            {!isNotifyNC && (
              <Grid item xs={12} sm={6}>
                <Controller
                  name="damageDegree"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="damageDegreeLabel">Grau do Dano</InputLabel>
                      <Select
                        {...field}
                        labelId="damageDegreeLabel"
                        label="Grau do Dano"
                        error={!!errors.damageDegree}
                      >
                        {DAMAGE_DEGREE.map((degree) => (
                          <MenuItem key={degree.id} value={degree.name}>
                            {degree.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.damageDegree && <FormHelperText>{errors.damageDegree.message}</FormHelperText>}
                    </FormControl>
                  )}
                />
              </Grid>
            )}

            {/* Title */}
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Título"
                    variant="outlined"
                    placeholder="Título da notificação"
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Descrição"
                    variant="outlined"
                    multiline
                    rows={4}
                    placeholder="Descreva o incidente com detalhes"
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>

            {/* Sectors Notify and Notified */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="sectorNotify"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="sectorNotifyLabel">Setor notificante</InputLabel>
                    <Select
                      {...field}
                      labelId="sectorNotifyLabel"
                      label="Setor notificante"
                      error={!!errors.sectorNotify}
                    >
                      {SECTORS.map((sector) => (
                        <MenuItem key={sector.numbercdc} value={sector.numbercdc}>
                          {sector.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.sectorNotify && <FormHelperText>{errors.sectorNotify.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="sectorNotified"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="sectorNotifiedLabel">Setor notificado</InputLabel>
                    <Select
                      {...field}
                      labelId="sectorNotifiedLabel"
                      label="Setor notificado"
                      error={!!errors.sectorNotified}
                    >
                      {SECTORS.map((sector) => (
                        <MenuItem key={sector.numbercdc} value={sector.numbercdc}>
                          {sector.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.sectorNotified && <FormHelperText>{errors.sectorNotified.message}</FormHelperText>}
                  </FormControl>
                )}
              />
              {isSectorsEqual && (
                <FormHelperText error>
                  Os setores notificante e notificado devem ser diferentes.
                </FormHelperText>
              )}
            </Grid>

            {/* Involved */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="involved"
                control={control}
                render={({ field }) => (
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Estou Envolvido no Incidente</FormLabel>
                    <RadioGroup row {...field}>
                      <FormControlLabel value="yes" control={<Radio />} label="Sim" />
                      <FormControlLabel value="no" control={<Radio />} label="Não" />
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </Grid>

            {/* Anonymous */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="anonymous"
                control={control}
                render={({ field }) => (
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Desejo Manter Anonimato</FormLabel>
                    <RadioGroup row {...field}>
                      <FormControlLabel value="yes" control={<Radio />} label="Sim" />
                      <FormControlLabel value="no" control={<Radio />} label="Não" />
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </Grid>

            {/* Submit Button */}
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
