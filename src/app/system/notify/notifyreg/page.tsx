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
} from "@mui/material";
import { useState } from "react";
import { PATIENT_RACE, SECTORS, TYPE_NOTIFICATION } from "@/utils/constants";
import { notifySchema } from "@/utils/validations";

export default function NotifyReg() {
   // Estados para gerenciar os campos
    const [formData, setFormData] = useState({
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
        registerPatient: 0,
    });

    // Estados para gerenciar os erros
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Validations
    const isSectorsEqual: boolean = 
        formData.sectorNotify === formData.sectorNotified && formData.sectorNotify !== '';
    const isNotifyNC: boolean = 
        formData.typeNotify === "Não conformidade";

    const handleChange = (field: string, value: string | number) => {
        setFormData((prev) => ({
          ...prev,
          [field]: value,
        }));
        setErrors((prev) => ({
          ...prev,
          [field]: "", // Limpa o erro ao alterar o campo
        }));
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
              type="string"
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
              type="string"
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
                onChange={(e) => handleChange("typeNotify", e.target.value)}
              >
                {TYPE_NOTIFICATION.map((type) => (
                  <MenuItem key={type.id} value={type.name}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Nome do Paciente */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nome do Paciente"
              variant="outlined"
              value={formData.patientName}
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
                onChange={(e) => handleChange("patientSex", e.target.value)}
              >
                <MenuItem value="M">Masculino</MenuItem>
                <MenuItem value="F">Feminino</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {isNotifyNC && (
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel id="patientRaceLabel">Raça/Cor</InputLabel>
                <Select
                    fullWidth
                    labelId="patientRaceLabel"
                    label="Raça/Cor"
                    value={formData.patientRace}
                    onChange={(e) => handleChange("patientRace", e.target.value)}
                >
                {PATIENT_RACE.map((race) => (
                    <MenuItem key={race.id} value={race.name}>
                        {race.name}
                    </MenuItem>
                ))}
                </Select>
              </FormControl>
            </Grid>
          )}

          {/* Idade e Data de Internação */}
          {isNotifyNC && (
            <>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Idade"
                        type="number"
                        variant="outlined"
                        value={formData.patientAge}
                        onChange={(e) => handleChange("patientAge", Number(e.target.value))}
                    />
                    </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Data de Internação do Paciente"
                        type="string"
                        placeholder="DD/MM/AAAA"
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
              rows={4}
              variant="outlined"
              value={formData.diagnostic}
              onChange={(e) => handleChange("diagnostic", e.target.value)}
            />
          </Grid>
          
          {/* Registro do Paciente */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Registro"
              variant="outlined"
              value={formData.registerPatient}
              onChange={(e) => handleChange("registerPatient", Number(e.target.value))}
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
                onChange={(e) => handleChange("eventType", e.target.value)}
              >
                <MenuItem value="1">Evento 1</MenuItem>
                <MenuItem value="2">Evento 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Grau do Dano */}
          {isNotifyNC && (
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="damageDegreeLabel">Grau do Dano</InputLabel>
                <Select
                  labelId="damageDegreeLabel"
                  label="Grau do Dano"
                  value={formData.damageDegree}
                  onChange={(e) => handleChange("damageDegree", e.target.value)}
                >
                  <MenuItem value="1">Baixo</MenuItem>
                  <MenuItem value="2">Médio</MenuItem>
                  <MenuItem value="3">Alto</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}

          {/* Título e Descrição */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Título"
              variant="outlined"
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
              placeholder="Descreva o incidente com detalhes"
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </Grid>

          {/* Notificante e Notificado */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="sectorNotifyLabel">Notificante</InputLabel>
              <Select
                labelId="sectorNotifyLabel"
                label="Notificante"
                value={formData.sectorNotify}
                onChange={(e) => handleChange("sectorNotify", e.target.value)}
              >
                {SECTORS.map((sector) => (
                  <MenuItem key={sector.id} value={sector.name}>
                    {sector.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="sectorNotifiedLabel">Notificado</InputLabel>
              <Select
                labelId="sectorNotifiedLabel"
                label="Notificado"
                value={formData.sectorNotified}
                onChange={(e) => handleChange("sectorNotified", e.target.value)}
              >
                {SECTORS.map((sector) => (
                  <MenuItem key={sector.id} value={sector.name}>
                    {sector.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="Não" control={<Radio />} label="Não" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Desejo Manter Anonimato</FormLabel>
              <RadioGroup
                row
                value={formData.anonymous}
                onChange={(e) => handleChange("anonymous", e.target.value)}
              >
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="Não" control={<Radio />} label="Não" />
              </RadioGroup>
            </FormControl>
          </Grid>


          {/* Botão de Envio */}
          <Grid item xs={12}>
            <Button
              disabled={isSectorsEqual}
              variant="contained"
              color="primary"
              onClick={() => console.log("Notificação registrada com sucesso!")}
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
