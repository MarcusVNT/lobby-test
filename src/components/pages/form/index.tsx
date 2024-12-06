'use client'

import {
  getRedeemPageDetails,
  postRedeemGift,
} from '@/api/redeem-gift/redeem-gift'
import { PostRedeemGiftType } from '@/types/redeem-gift/postRedeemGiftType'
import { Button, MenuItem, Stack, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import masks from '../../utils/masks'
import { Slide, toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { GetRedeemPageDetailsType } from '@/types/redeem-gift/getRedeemPageDetailsType'

const brazilStates = [
  { label: 'Acre', value: 'AC' },
  { label: 'Alagoas', value: 'AL' },
  { label: 'Amazonas', value: 'AM' },
  { label: 'Bahia', value: 'BA' },
  { label: 'Ceará', value: 'CE' },
  { label: 'Distrito Federal', value: 'DF' },
  { label: 'Espírito Santo', value: 'ES' },
  { label: 'Goiás', value: 'GO' },
  { label: 'Maranhão', value: 'MA' },
  { label: 'Mato Grosso', value: 'MT' },
  { label: 'Mato Grosso do Sul', value: 'MS' },
  { label: 'Minas Gerais', value: 'MG' },
  { label: 'Pará', value: 'PA' },
  { label: 'Paraíba', value: 'PB' },
  { label: 'Paraná', value: 'PR' },
  { label: 'Pernambuco', value: 'PE' },
  { label: 'Piauí', value: 'PI' },
  { label: 'Rio de Janeiro', value: 'RJ' },
  { label: 'Rio Grande do Norte', value: 'RN' },
  { label: 'Rio Grande do Sul', value: 'RS' },
  { label: 'Rondônia', value: 'RO' },
  { label: 'Roraima', value: 'RR' },
  { label: 'Santa Catarina', value: 'SC' },
  { label: 'São Paulo', value: 'SP' },
  { label: 'Sergipe', value: 'SE' },
  { label: 'Tocantins', value: 'TO' },
]

const countries = [
  { value: 'BR', label: 'Brasil' },
  { value: 'AR', label: 'Argentina' },
  { value: 'URU', label: 'Uruguay' },
  { value: 'CL', label: 'Chile' },
  { value: 'COL', label: 'Colombia' },
  { value: 'PER', label: 'Peru' },
  { value: 'PAR', label: 'Paraguay' },
  { value: 'VEN', label: 'Venezuela' },
  { value: 'ECU', label: 'Ecuador' },
  { value: 'BOL', label: 'Bolivia' },
]

export default function Form() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const [detailsPage, setDetailsPage] = useState<
    GetRedeemPageDetailsType | undefined
  >(undefined)

  const { data: redeemPage } = useQuery({
    queryKey: ['redeemPage', params.id],
    queryFn: () => getRedeemPageDetails(params.id),
    enabled: !!params.id,
  })

  useEffect(() => {
    if (redeemPage) {
      setDetailsPage(redeemPage)
    }
  }, [redeemPage])

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
        detailsPage?.items.map(item => ({
          customer_product_id: item.customer_product_id || '',
          size_name: '',
        })) || [],
    },
  })

  const redeemGifts = useMutation({
    mutationFn: ({ id, data }: { id: string; data: PostRedeemGiftType }) =>
      postRedeemGift(id, data),
    onSuccess: () => {
      toast.success('Presente resgatado com sucesso! 🎉🎁', {
        position: 'bottom-right',
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        transition: Slide,
      })
      router.push('/presente-resgatado')
    },
    onError: () => {
      toast.error(
        'Erro ao resgatar presente. Tente novamente ou entre em contato com o suporte.',
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
          transition: Slide,
        },
      )
    },
  })

  const extraQuestions = detailsPage?.extra_questions || []
  const questionsText =
    detailsPage?.extra_questions?.filter(
      question => question.answer_type === 'text',
    ) || []

  const questionsTextArea =
    detailsPage?.extra_questions?.filter(
      question => question.answer_type === 'text_area',
    ) || []
  const questionsSelectOne =
    detailsPage?.extra_questions?.filter(
      question => question.answer_type === 'select_one',
    ) || []
  const questionsDate =
    detailsPage?.extra_questions?.filter(
      question => question.answer_type === 'date',
    ) || []
  const productSizes =
    detailsPage?.items.filter(item => item.sizes.length > 0) || []

  const handleOnSubmit = (data: PostRedeemGiftType) => {
    if (!params.id) {
      toast.error(
        'Erro ao resgatar presente. Tente novamente ou entre em contato com o suporte.',
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
          transition: Slide,
        },
      )
      return
    }
    redeemGifts.mutate({
      id: params.id,
      data,
    })
  }

  return (
    <Stack alignItems="center" justifyContent="center" minHeight="100vh">
      <Stack
        borderRadius={'24px'}
        bgcolor="#fff"
        padding={{ xs: '40px 20px', sm: '40px 64px' }}
        maxWidth="1024px"
        width="100%"
      >
        <Typography
          fontSize="1.25rem"
          textAlign="center"
          fontWeight="600"
          marginBottom="40px"
          component="h1"
        >
          Finalize seu resgate! 🚚
        </Typography>

        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <Grid container spacing="20px" marginBottom="40px">
            <Grid size={12} marginBottom="12px">
              <Typography variant="h2" component="h2" fontWeight="600">
                Dados do destinatário
              </Typography>
            </Grid>
            <Grid size={12} marginBottom="12px">
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
                    size="small"
                    fullWidth
                    disabled={redeemGifts.isPending}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <Controller
                name="redeemer_document_number"
                control={control}
                rules={{
                  required: 'Este campo é obrigatório.',
                }}
                render={({ field, fieldState: { error, invalid } }) => (
                  <TextField
                    {...field}
                    error={invalid}
                    helperText={error?.message}
                    label="CPF ou CNPJ*"
                    variant="standard"
                    size="small"
                    fullWidth
                    disabled={redeemGifts.isPending}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.onChange(masks.cpf_cnpj(e))
                    }
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <Controller
                name="redeemer_phone"
                control={control}
                render={({ field, fieldState: { error, invalid } }) => (
                  <TextField
                    {...field}
                    error={invalid}
                    helperText={error?.message}
                    label="Telefone"
                    variant="standard"
                    size="small"
                    fullWidth
                    disabled={redeemGifts.isPending}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.onChange(masks.phone(e))
                    }
                    value={field.value || ''}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="redeemer_email"
                control={control}
                rules={{
                  required: 'E-mail é obrigatório.',
                  pattern: {
                    value:
                      /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}(?:\.[a-z]{2})?$/,
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
                    size="small"
                    fullWidth
                    disabled={redeemGifts.isPending}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid container spacing="20px" marginBottom="40px">
            <Grid size={12} marginBottom="12px">
              <Typography variant="h2" component="h2" fontWeight="600">
                Endereço de entrega
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} marginBottom="12px">
              <Controller
                name="redeemer_zipcode"
                control={control}
                rules={{
                  required: 'CEP é obrigatório.',
                }}
                render={({ field, fieldState: { error, invalid } }) => (
                  <TextField
                    {...field}
                    error={invalid}
                    helperText={error?.message}
                    label="CEP*"
                    variant="standard"
                    size="small"
                    fullWidth
                    disabled={redeemGifts.isPending}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.onChange(masks.cep(e))
                    }
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} marginBottom="12px">
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
                    size="small"
                    fullWidth
                    disabled={redeemGifts.isPending}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, md: 3 }} marginBottom="12px">
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
                    disabled={redeemGifts.isPending}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, md: 3 }} marginBottom="12px">
              <Controller
                name="redeemer_complement"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Complemento"
                    variant="standard"
                    fullWidth
                    disabled={redeemGifts.isPending}
                  />
                )}
              />
            </Grid>
            <Grid size={6} marginBottom="12px">
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
                    disabled={redeemGifts.isPending}
                  />
                )}
              />
            </Grid>
            <Grid size={6}>
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
                    disabled={redeemGifts.isPending}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
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
                    disabled={redeemGifts.isPending}
                  >
                    {brazilStates.map(state => (
                      <MenuItem key={state.value} value={state.value}>
                        {state.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Controller
                name="redeemer_country"
                control={control}
                rules={{
                  required: 'Seleção de um país é obrigatório.',
                }}
                render={({ field, fieldState: { error, invalid } }) => (
                  <TextField
                    {...field}
                    error={invalid}
                    helperText={error?.message}
                    value={field.value || ''}
                    label="País*"
                    variant="standard"
                    select
                    fullWidth
                    disabled={redeemGifts.isPending}
                  >
                    {countries.map(country => (
                      <MenuItem key={country.value} value={country.value}>
                        {country.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
          </Grid>

          <Grid container spacing="20px" marginBottom="40px">
            {productSizes.length > 0 && (
              <Grid size={12} marginBottom="12px">
                <Typography variant="h2" component="h2" fontWeight="600">
                  Tamanhos
                </Typography>
              </Grid>
            )}

            {productSizes.length > 0 &&
              productSizes?.map((product, index) => (
                <Grid
                  size={{ xs: 12, sm: 6 }}
                  key={product.customer_product_id}
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
                        size="small"
                        select
                        fullWidth
                        disabled={redeemGifts.isPending}
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

          <Grid container spacing="20px">
            {extraQuestions.length > 0 && (
              <Grid size={12} marginBottom="12px">
                <Typography variant="h2" component="h2" fontWeight="600">
                  Perguntas extras
                </Typography>
              </Grid>
            )}

            <Grid size={12} marginBottom="12px">
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
                          size="small"
                          fullWidth
                          disabled={redeemGifts.isPending}
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  </Grid>
                ))}
            </Grid>
            <Grid size={{ xs: 6, md: 3 }} marginBottom="12px">
              {questionsDate.length > 0 &&
                questionsDate.map(question => (
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
                          size="small"
                          type="date"
                          fullWidth
                          disabled={redeemGifts.isPending}
                          slotProps={{
                            inputLabel: { shrink: true },
                          }}
                        />
                      )}
                    />
                  </Grid>
                ))}
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} marginBottom="12px">
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
                          size="small"
                          select
                          fullWidth
                          disabled={redeemGifts.isPending}
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
            <Grid size={12}>
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
                          variant="outlined"
                          size="small"
                          fullWidth
                          disabled={redeemGifts.isPending}
                          multiline
                          sx={{
                            borderColor: '#B1B9C5',
                            '&:focus': { borderColor: '#64748b' },
                          }}
                          rows={5}
                        />
                      )}
                    />
                  </Grid>
                ))}
            </Grid>
          </Grid>

          <Stack flexDirection="row" justifyContent="space-between" mt="40px">
            <Button
              color="primary"
              variant="outlined"
              onClick={() => router.push(`/${params}`)}
              disabled={redeemGifts.isPending}
            >
              Voltar
            </Button>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={redeemGifts.isPending}
            >
              Concluir
            </Button>
          </Stack>
        </form>
      </Stack>
    </Stack>
  )
}
