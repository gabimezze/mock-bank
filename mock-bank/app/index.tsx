import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Home() {
    const router = useRouter();

    const [nome, setNome] = useState("");
    const [cpf, setCPF] = useState("");
    const [apelido, setApelido] = useState("");
    const [senha, setSenha] = useState("");

    async function getData() {
        // Forma 1

        fetch("https://viacep.com.br/ws/01001000/json/")
            .then(response => response.json())
            .then(data => {
                console.log("===> Metodo 1")
                console.log(data)
                console.log("===> Metodo 1")
            })

        // Forma 2
        const response = await fetch("https://viacep.com.br/ws/01001000/json/");

        const data = await response.json();

        console.log("==> Metodo 2")
        console.log(data)
        console.log("==> Metodo 2")

    }

    async function submit() {
        try {
            // https://mock-bank-mock-back.yexuz7.easypanel.host/

            console.log("===> submit 1")
            const datToSend = {
                nome,
                cpf,
                apelido,
                senha,
            }

            console.log("===> submit 2")
            console.log(datToSend)
            console.log("===> submit 2")

            const response = await
                fetch("https://mock-bank-mock-back.yexuz7.easypanel.host/contas", {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify(datToSend)
                });

            if (!response.ok) {
                const dataError = await response.json();

                throw new Error(dataError?.message);
            }

            const data = await response.json();

            console.log("===> data submit")
            console.log(data)
            console.log("===> data submit")

            router.push("/Login");
        } catch (error) {
            alert(error?.message);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>

                {/* "nome": "João Silva",*/}
                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>
                        Nome
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: João Silva"
                        value={nome}
                        onChangeText={(text) => setNome(text)}
                    />
                </View>

                {/* "cpf": "123.456.789-00", */}
                <View style={styles.inputWrapper}>
                    <Text
                        style={styles.label}
                    >
                        CPF
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: João Silva"
                        value={cpf}
                        onChangeText={(text) => setCPF(text)}
                    />
                </View>

                {/* "apelido": "joaozinho", */}
                <View
                    style={styles.inputWrapper}
                >
                    <Text
                        style={styles.label}
                    >
                        Apelido
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: João Silva"
                        value={apelido}
                        onChangeText={(text) => setApelido(text)}
                    />
                </View>

                {/* "senha": "senha123"  */}
                <View
                    style={styles.inputWrapper}
                >
                    <Text
                        style={styles.label}
                    >
                        Senha
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: João Silva"
                        value={senha}
                        onChangeText={(text) => setSenha(text)}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={submit}
                >
                    <Text style={styles.buttonText}>
                        Cadastrar!
                    </Text>
                </TouchableOpacity>
            </View>

            <Link href="/Login" style={styles.redirectButton}>
                <Text style={styles.redirectButtonText}>
                    Já tenho cadastro
                </Text>
            </Link>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
        gap: 30,
        paddingHorizontal: 20
    },
    inputWrapper: {
        gap: 5
    },
    input: {
        borderWidth: 2,
        borderColor: "#ccc",
        height: 50,
        paddingHorizontal: 10,
        borderRadius: 15,
        fontSize: 16
    },
    label: {
        fontSize: 20,
        fontWeight: 600
    },
    button: {
        backgroundColor: "#31c0f5",
        alignItems: "center",
        padding: 20,
        borderRadius: 15
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 500
    },
    redirectButton: {
        alignItems: "center",
        width: "100%",
        marginTop: 30
    },
    redirectButtonText: {
        fontSize: 16,
        fontWeight: 400,
        color: "#31c0f5",
        textAlign: "center"
    },
});
