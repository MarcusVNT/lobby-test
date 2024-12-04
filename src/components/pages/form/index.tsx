'use client'

import {
  getRedeemPageDetails,
  postRedeemGift,
} from '@/api/redeem-gift/redeem-gift'
import { PostRedeemGiftType } from '@/types/redeem-gift/postRedeemGiftType'
import {
  Button,
  FormControlLabel,
  FormLabel,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { DatePicker } from '@mui/x-date-pickers'
import React from 'react'

export default function Form() {
  const router = useRouter()
  const params = useParams<{ id: string }>()

  const { data: redeemPageDetails } = useQuery({
    queryKey: ['redeemPageDetails', params.id],
    queryFn: () => getRedeemPageDetails(params.id),
    enabled: !!params.id,
  })

  const { handleSubmit, control } = useForm<PostRedeemGiftType>({
    defaultValues: {
      redeemer_name: '',
      redeemer_email: '',
      redeemer_document_number: '',
      redeemer_zipcode: '',
      redeemer_street: '',
      redeemer_number: '',
      redeemer_complement: '',
      redeemer_neighborhood: '',
      redeemer_city: '',
      redeemer_state: '',
      redeemer_country: '',
      redeemer_phone: '',
      extra_question_responses: [
        {
          extra_question_id: 0,
          answer: '',
        },
      ],
      items:
        redeemPageDetails?.items.map(item => ({
          customer_product_id: item.customer_product_id || '',
          size_name: '',
        })) || [],
    },
  })

  const { mutate } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: PostRedeemGiftType }) =>
      postRedeemGift(id, data),
    onSuccess: () => {
      router.push('/presente-resgatado')
      console.log('submit')
    },
    onError: error => {
      console.error(error)
    },
  })

  const questionsText =
    redeemPageDetails?.extra_questions?.filter(
      question => question.answer_type === 'text',
    ) || []

  const questionsTextArea =
    redeemPageDetails?.extra_questions?.filter(
      question => question.answer_type === 'text_area',
    ) || []
  const questionsSelectOne =
    redeemPageDetails?.extra_questions?.filter(
      question => question.answer_type === 'select_one',
    ) || []
  const questionsDate =
    redeemPageDetails?.extra_questions?.filter(
      question => question.answer_type === 'date',
    ) || []
  const productSizes =
    redeemPageDetails?.items.filter(item => item.sizes.length > 0) || []

  // console.log('detalhes: ', redeemPageDetails)
  // console.log('questionsText: ', questionsText)
  // console.log('productSizes: ', productSizes)

  const handleOnSubmit = (data: PostRedeemGiftType) => {
    if (!params.id) {
      console.error('ID do resgate não encontrado')
      return
    }
    mutate({
      id: params.id,
      data,
    })
    console.log('data: ', data)
  }

  return (
    <Stack alignItems="center" justifyContent="center" minHeight="100vh">
      <Stack
        borderRadius={'24px'}
        bgcolor="#fff"
        padding="40px 64px"
        maxWidth="1024px"
        width="100%"
      >
        <Typography fontSize="1.25rem" textAlign="center" fontWeight="600">
          Finalize seu resgate! 🚚
        </Typography>

        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <Grid container marginTop="40px" spacing={2}>
            <Grid size={12} marginBottom="40px">
              <Typography variant="h2" fontWeight="600">
                Dados do destinatário
              </Typography>
            </Grid>
            <Grid size={12} marginBottom="40px">
              <Controller
                name="redeemer_name"
                control={control}
                rules={{
                  required: 'Nome completo é obrigatório.',
                  minLength: {
                    value: 5,
                    message: 'Nome completo deve ter no mínimo 5 caracteres.',
                  },
                }}
                render={({ field, fieldState: { error, invalid } }) => (
                  <TextField
                    {...field}
                    error={invalid}
                    helperText={error?.message}
                    label="Nome completo*"
                    variant="standard"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid size={3} marginBottom="40px">
              <Controller
                name="redeemer_document_number"
                control={control}
                rules={{
                  required: 'Este campo é obrigatório.',
                  minLength: {
                    value: 11,
                    message: 'CPF ou CNPJ inválido.',
                  },
                  maxLength: {
                    value: 14,
                    message: 'CPF ou CNPJ inválido.',
                  },
                }}
                render={({ field, fieldState: { error, invalid } }) => (
                  <TextField
                    {...field}
                    error={invalid}
                    helperText={error?.message}
                    label="CPF ou CNPJ*"
                    variant="standard"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid size={3} marginBottom="40px">
              <Controller
                name="redeemer_phone"
                control={control}
                render={({ field, fieldState: { error, invalid } }) => (
                  // <ReactInputMask
                  //   mask="(99) 99999-9999"
                  //   value={field.value}
                  //   onChange={field.onChange}
                  // >
                  <TextField
                    {...field}
                    error={invalid}
                    helperText={error?.message}
                    label="Telefone"
                    variant="standard"
                    fullWidth
                  />
                  // </ReactInputMask>
                )}
              />
            </Grid>
            <Grid size={6} marginBottom="40px">
              <Controller
                name="redeemer_email"
                control={control}
                rules={{
                  required: 'E-mail é obrigatório.',
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: 'E-mail inválido.',
                  },
                }}
                render={({ field, fieldState: { error, invalid } }) => (
                  <TextField
                    {...field}
                    error={invalid}
                    helperText={error?.message}
                    label="E-mail*"
                    variant="standard"
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid size={12} marginBottom="40px">
              <Typography variant="h2" fontWeight="600">
                Endereço de entrega
              </Typography>
            </Grid>
            <Grid size={6} marginBottom="40px">
              <Controller
                name="redeemer_zipcode"
                control={control}
                rules={{
                  required: 'CEP é obrigatório.',
                  minLength: {
                    value: 8,
                    message: 'CEP inválido.',
                  },
                  maxLength: {
                    value: 8,
                    message: 'CEP inválido.',
                  },
                }}
                render={({ field, fieldState: { error, invalid } }) => (
                  <TextField
                    {...field}
                    error={invalid}
                    helperText={error?.message}
                    label="CEP*"
                    variant="standard"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid size={6} marginBottom="40px">
              <Controller
                name="redeemer_street"
                control={control}
                rules={{
                  required: 'Logradouro é obrigatório.',
                }}
                render={({ field, fieldState: { error, invalid } }) => (
                  <TextField
                    {...field}
                    error={invalid}
                    helperText={error?.message}
                    label="Rua*"
                    variant="standard"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid size={3} marginBottom="40px">
              <Controller
                name="redeemer_number"
                control={control}
                rules={{
                  required: 'Número é obrigatório.',
                }}
                render={({ field, fieldState: { error, invalid } }) => (
                  <TextField
                    {...field}
                    error={invalid}
                    helperText={error?.message}
                    label="Número*"
                    variant="standard"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid size={3} marginBottom="40px">
              <Controller
                name="redeemer_complement"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Complemento*"
                    variant="standard"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid size={6} marginBottom="40px">
              <Controller
                name="redeemer_neighborhood"
                control={control}
                rules={{
                  required: 'Bairro é obrigatório.',
                }}
                render={({ field, fieldState: { error, invalid } }) => (
                  <TextField
                    {...field}
                    error={invalid}
                    helperText={error?.message}
                    label="Bairro*"
                    variant="standard"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid size={6} marginBottom="40px">
              <Controller
                name="redeemer_city"
                control={control}
                rules={{
                  required: 'Cidade é obrigatória.',
                  minLength: {
                    value: 3,
                    message: 'Cidade inválida.',
                  },
                }}
                render={({ field, fieldState: { error, invalid } }) => (
                  <TextField
                    {...field}
                    error={invalid}
                    helperText={error?.message}
                    label="Cidade*"
                    variant="standard"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid size={3} marginBottom="40px">
              <Controller
                name="redeemer_state"
                control={control}
                rules={{
                  required: 'Seleção de um estado é obrigatório.',
                }}
                render={({ field, fieldState: { error, invalid } }) => (
                  <TextField
                    {...field}
                    error={invalid}
                    helperText={error?.message}
                    label="Estado*"
                    variant="standard"
                    select
                    fullWidth
                  >
                    //fazer uma array dos estados do brasil.
                    <MenuItem value="SP">São Paulo</MenuItem>
                    <MenuItem value="RJ">Rio de Janeiro</MenuItem>
                    <MenuItem value="MG">Minas Gerais</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            <Grid size={3} marginBottom="40px">
              <Controller
                name="redeemer_country"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={field.value || ''}
                    label="País"
                    variant="standard"
                    select
                    fullWidth
                  >
                    <MenuItem value="BR">Brasil</MenuItem>
                    <MenuItem value="AR">Argentina</MenuItem>
                    <MenuItem value="URU">Uruguay</MenuItem>
                    <MenuItem value="CL">Chile</MenuItem>
                    <MenuItem value="COL">Colombia</MenuItem>
                    <MenuItem value="PER">Peru</MenuItem>
                    <MenuItem value="PAR">Paraguay</MenuItem>
                    <MenuItem value="VEN">Venezuela</MenuItem>
                    <MenuItem value="ECU">Ecuador</MenuItem>
                    <MenuItem value="BOL">Bolivia</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid size={12} marginBottom="40px">
              <Typography variant="h2" fontWeight="600">
                Tamanhos
              </Typography>
            </Grid>

            {productSizes.length > 0 &&
              productSizes?.map((product, index) => (
                <Grid
                  size={6}
                  key={product.customer_product_id}
                  marginBottom="40px"
                >
                  <Controller
                    name={`items.${index}.customer_product_id`}
                    control={control}
                    defaultValue={product.customer_product_id}
                    render={({ field }) => <input type="hidden" {...field} />}
                  />
                  <Controller
                    name={`items.${index}.size_name`}
                    control={control}
                    rules={{
                      required: 'Este campo é obrigatório.',
                    }}
                    render={({ field, fieldState: { error, invalid } }) => (
                      <TextField
                        {...field}
                        error={invalid}
                        helperText={error?.message}
                        value={field.value || ''}
                        label="Qual seu tamanho de camiseta?*"
                        variant="standard"
                        select
                        fullWidth
                      >
                        {product.sizes.map(size => (
                          <MenuItem key={size.id} value={size.name}>
                            {size.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
              ))}
          </Grid>

          <Grid container spacing={2}>
            <Grid size={12} marginBottom="40px">
              <Typography variant="h2" fontWeight="600">
                Perguntas extras
              </Typography>
            </Grid>

            <Grid size={12} marginBottom="40px">
              {questionsText.length > 0 &&
                questionsText.map(question => (
                  <Grid key={question.id}>
                    <Controller
                      name={`extra_question_responses.${question.id}.answer`}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          label={question.question}
                          value={field.value ?? ''}
                          variant="standard"
                          fullWidth
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  </Grid>
                ))}
            </Grid>
            <Grid size={6} marginBottom="40px">
              {questionsDate.length > 0 &&
                questionsDate.map(question => (
                  <Grid key={question.id}>
                    <Controller
                      name={`extra_question_responses.${question.id}.answer`}
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          value={field.value || null}
                          label="Data de nascimento"
                        />
                      )}
                    />
                  </Grid>
                ))}
            </Grid>

            <Grid size={6} marginBottom="40px">
              {questionsSelectOne.length > 0 &&
                questionsSelectOne.map(question => (
                  <Grid key={question.id}>
                    <Controller
                      name={`extra_question_responses.${question.id}.answer`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          value={field.value || ''}
                          label={question.question}
                          variant="standard"
                          select
                          fullWidth
                        >
                          {question.options.map((option, index) => (
                            <MenuItem key={index} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  </Grid>
                ))}
            </Grid>
            <Grid size={12} marginBottom="40px">
              {questionsTextArea.length > 0 &&
                questionsTextArea.map((question, index) => (
                  <Grid key={question.id}>
                    <Controller
                      name={`extra_question_responses.${index}.answer`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label={question.question}
                          variant="standard"
                          fullWidth
                          multiline
                          rows={5}
                        />
                      )}
                    />
                  </Grid>
                ))}
            </Grid>
          </Grid>

          <Stack flexDirection="row" justifyContent="space-between">
            <Button color="primary" variant="outlined">
              Voltar
            </Button>
            <Button color="primary" variant="contained" type="submit">
              Concluir
            </Button>
          </Stack>
        </form>
      </Stack>
    </Stack>
  )
}
