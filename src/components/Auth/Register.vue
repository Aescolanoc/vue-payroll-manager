<template>
  <div class="register">
    <h1>Crear cuenta</h1>

    <form class="ui form" @submit.prevent="onRegister">
      <div class="field">
        <input
          type="text"
          placeholder="Correo electronico"
          v-model="formData.email"
          :class="{ error: formError.email }"
        />
      </div>

      <div class="field">
        <input
          type="password"
          placeholder="Contraseña"
          v-model="formData.password"
          :class="{ error: formError.password }"
        />
      </div>

      <div class="field">
        <input
          type="password"
          placeholder="Repetir contraseña"
          v-model="formData.repeatPassword"
          :class="{ error: formError.repeatPassword }"
        />
      </div>

      <button type="submit" class="ui button positive fluid" :class="{ loading }">Registrar</button>
    </form>

    <p @click="changeForm">Iniciar sesión</p>
  </div>
</template>

<script>
import { ref } from "vue";
import * as yup from "yup";
import { auth } from "../../utils/firebase";

export default {
  name: "Register",
  props: {
    changeForm: Function,
  },
  setup() {
    let formData = {};
    let formError = ref({});
    let loading = ref(false);

    const schemaForm = yup.object().shape({
      email: yup.string().email(true).required(true),
      password: yup.string().required(true),
      repeatPassword: yup
        .string()
        .required(true)
        .oneOf([yup.ref("password")], true, "Las contraseñas no coinciden"),
    });

    const onRegister = async () => {
      loading.value = true;
      formError.value = {};
      console.log("Registrando...");
      console.log(formData);

      try {
        await schemaForm.validate(formData, { abortEarly: false });
        try {
          const { email, password } = formData;

          await auth.createUserWithEmailAndPassword(email, password);
        } catch (error) {
          console.log(error);
        }
      } catch (err) {
        err.inner.forEach((error) => {
          formError.value[error.path] = error.message;
        });
      }
      loading.value = false;
    };

    return {
      formData,
      onRegister,
      formError,
      loading,
    };
  },
};
</script>

<style lang="scss" scoped>
.register {
  background-color: white;
  padding: 30px;
  box-shadow: 0px 0px 38px -5px rgba(0, 0, 0, 0.45);
  width: 400px;
  border-radius: 10px;

  h1 {
    text-align: center;
    margin-bottom: 30px;
  }

  form {
    input.error {
      border-color: #faa;
      background-color: #ffeded;
    }
  }

  p {
    text-align: center;
    margin-top: 30px;

    &:hover {
      cursor: pointer;
      opacity: 0.6;
    }
  }
}
</style>
