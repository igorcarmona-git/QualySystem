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
import { handleSubmitZod } from "@/utils/common/form/handleSubmitZod";
import { useForm } from "@/utils/common/form/useForm";

export default function NotifyReg() {
  const { formData, errors, setErrors, handleChange } = useForm({
    sectorNotify: "",
    sectorNotified: "",
    typeNotify: "",
    description: "",
    diagnostic: "",
    dateOccurrence: "",
    timeOccurrence: "",
    patientName: "",
    patientSex: "",
    patientRace: "",
    patientAge: "",
    admissionDate: "",
    eventType: "",
    damageDegree: "",
    title: "",
    involved: "",
    anonymous: "",
    registerPatient: "",
  });

  // Validations
  const isSectorsEqual: boolean = 
    formData.sectorNotify === formData.sectorNotified && formData.sectorNotify !== '';
  const isNotifyNC: boolean = formData.typeNotify === "Não conformidade";

  const handleSubmit = () => {
    const validation = handleSubmitZod(notifySchema, formData, setErrors);
    console.log(validation);
    if (validation) {
      console.log("Dados validados:", validation);
    }
    console.error("Erros de validação", validation);
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

        <Grid container spacing={2}>
          {/* Data e Hora da Ocorrência */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Data da Ocorrência"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.dateOccurrence}
              onChange={(e) => handleChange("dateOccurrence", e.target.value)}
              error={!!errors.dateOccurrence}
              helperText={errors.dateOccurrence}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Hora da Ocorrência"
              type="time"
              InputLabelProps={{ shrink: true }}
              value={formData.timeOccurrence}
              onChange={(e) => handleChange("timeOccurrence", e.target.value)}
              error={!!errors.timeOccurrence}
              helperText={errors.timeOccurrence}
            />
          </Grid>

          {/* Tipo de Notificação */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="typeNotifyLabel">Tipo de Notificação</InputLabel>
              <Select
                labelId="typeNotifyLabel"
                label="Tipo de Notificação"
                value={formData.typeNotify}
                error={!!errors.typeNotify}
                onChange={(e) => handleChange("typeNotify", e.target.value)}
              >
                {TYPE_NOTIFICATION.map((type) => (
                  <MenuItem key={type.id} value={type.name}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.typeNotify && <FormHelperText error>{errors.typeNotify}</FormHelperText>}
            </FormControl>
          </Grid>

          {/* Nome do Paciente */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nome do Paciente"
              variant="outlined"
              value={formData.patientName}
              placeholder="Nome do paciente completo"
              onChange={(e) => handleChange("patientName", e.target.value)}
              error={!!errors.patientName}
              helperText={errors.patientName}   
            />
          </Grid>

          {/* Sexo e Raça/Cor */}
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel id="patientSexLabel">Sexo</InputLabel>
              <Select
                labelId="patientSexLabel"
                label="Sexo"
                value={formData.patientSex}
                error={!!errors.patientSex}
                onChange={(e) => handleChange("patientSex", e.target.value)}
              >
                <MenuItem value="M">Masculino</MenuItem>
                <MenuItem value="F">Feminino</MenuItem>
              </Select>
              {errors.patientSex && <FormHelperText error>{errors.patientSex}</FormHelperText>}
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
                    value={formData.patientRace}
                    onChange={(e) => handleChange("patientRace", e.target.value)}
                >
                {PATIENT_RACE.map((race) => (
                    <MenuItem key={race.id} value={race.name}>
                        {race.name}
                    </MenuItem>
                ))}
                </Select>
                {errors.patientRace && <FormHelperText error>{errors.patientRace}</FormHelperText>}
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
                    error={!!errors.patientAge}
                    value={formData.patientAge}
                    onChange={(e) => handleChange("patientAge", e.target.value)}
                  >
                  {AGE_RANGE.map((age) => (
                      <MenuItem key={age.id} value={age.name}>
                          {age.name}
                      </MenuItem>
                  ))}
              </Select>
            </FormControl>
                </Grid>
              <Grid item xs={12} sm={6}>
                  <TextField
                      fullWidth
                      label="Data de Internação do Paciente"
                      type="date"
                      placeholder="DD/MM/AAAA"
                      error={!!errors.admissionDate}
                      helperText={errors.admissionDate}
                      InputLabelProps={{ shrink: true }}
                      value={formData.admissionDate}
                      onChange={(e) => handleChange("admissionDate", e.target.value)}
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
              error={!!errors.diagnostic}
              helperText={errors.diagnostic}
              value={formData.diagnostic}
              onChange={(e) => handleChange("diagnostic", e.target.value)}
            />
          </Grid>
          
          {/* Registro do Paciente */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Registro do Paciente"
              type="string"
              variant="outlined"
              error={!!errors.registerPatient}
              helperText={errors.registerPatient}
              placeholder="Digite apenas números do registro do paciente"
              value={formData.registerPatient}
              onChange={(e) => handleChange("registerPatient", e.target.value)}
            />
          </Grid>

          {/* Tipo de Evento */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="eventTypeLabel">Tipo de Evento</InputLabel>
              <Select
                labelId="eventTypeLabel"
                label="Tipo de Evento"
                value={formData.eventType}
                error={!!errors.eventType}
                onChange={(e) => handleChange("eventType", e.target.value)}
              >
                <MenuItem value="1">Evento 1</MenuItem>
                <MenuItem value="2">Evento 2</MenuItem>
              </Select>
              {errors.eventType && <FormHelperText error>{errors.eventType}</FormHelperText>}
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
                  value={formData.damageDegree}
                  error={!!errors.damageDegree}
                  onChange={(e) => handleChange("damageDegree", e.target.value)}
                >
                  {DAMAGE_DEGREE.map((degree) => (
                    <MenuItem key={degree.id} value={degree.name}>
                      {degree.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.damageDegree && <FormHelperText error>{errors.damageDegree}</FormHelperText>}
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
              error={!!errors.title}
              helperText={errors.title}
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descrição"
              variant="outlined"
              multiline
              rows={4}
              value={formData.description}
              error={!!errors.description}
              helperText={errors.description}
              placeholder="Descreva o incidente com detalhes"
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </Grid>

          {/* Notificante e Notificado */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="sectorNotifyLabel">Setor notificante</InputLabel>
              <Select
                labelId="sectorNotifyLabel"
                label="Setor notificante"
                error={!!errors.sectorNotify}
                value={formData.sectorNotify}
                onChange={(e) => handleChange("sectorNotify", e.target.value)}
              >
                {SECTORS.map((sector) => (
                  <MenuItem key={sector.id} value={sector.name}>
                    {sector.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.sectorNotify && <FormHelperText error>{errors.sectorNotify}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="sectorNotifiedLabel">Setor notificado</InputLabel>
              <Select
                labelId="sectorNotifiedLabel"
                label="Setor notificado"
                error={!!errors.sectorNotified}
                value={formData.sectorNotified}
                onChange={(e) => handleChange("sectorNotified", e.target.value)}
              >
                {SECTORS.map((sector) => (
                  <MenuItem key={sector.id} value={sector.name}>
                    {sector.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.sectorNotified && <FormHelperText error>{errors.sectorNotified}</FormHelperText>}
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
                value={formData.involved}
                onChange={(e) => handleChange("involved", e.target.value)}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Sim" />
                <FormControlLabel value="no" control={<Radio />} label="Não" />
              </RadioGroup>
            </FormControl>
            {errors.involved && <FormHelperText error>{errors.involved}</FormHelperText>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Desejo Manter Anonimato</FormLabel>
              <RadioGroup
                row
                value={formData.anonymous}
                onChange={(e) => handleChange("anonymous", e.target.value)}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Sim" />
                <FormControlLabel value="no" control={<Radio />} label="Não" />
              </RadioGroup>
            </FormControl>
            {errors.anonymous && <FormHelperText error>{errors.anonymous}</FormHelperText>}
          </Grid>


          {/* Botão de Envio */}
          <Grid item xs={12}>
            <Button
              disabled={isSectorsEqual}
              variant="contained"
              color="primary"
              onClick={() => handleSubmit()}
              sx={{ mt: 3, mb: 2 }}
            >
              Enviar à Qualidade
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
