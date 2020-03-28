class Serialize {
    public static async this(clazzName: Clazz, variables: any) {
        try {
            clazz
                .find((clazzz: any) => clazzz.name == clazzName)
                .serializable.forEach((element: string) => {
                    if (Array.isArray(variables)) {
                        variables.map((variable: any) => {

                            if (variable[element]) variable[element] = JSON.parse(variable[element]);
                        });
                    } else {
                        if (variables[element])
                            variables[element] = JSON.parse(variables[element]);
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }
}

const clazz: any[] = [
    { name: "type", serializable: ["values"] },
    { name: "control", serializable: ["value", "roomId"] },
];

class Deserialize {
    public static async this(clazzName: Clazz, variables: any) {
        try {
            clazz
                .find((clazzz: any) => clazzz.name == clazzName)
                .serializable.forEach((element: string) => {
                    if (Array.isArray(variables)) {
                        variables.map((variable: any) => {
                            if (variable[element])
                                variable[element] = String(variable[element]);
                        });
                    } else {
                        if (variables[element])
                            variables[element] = String(variables[element]);
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }
}

enum Clazz {
    type = "type",
    control = "control"
}

export { Serialize, Deserialize, Clazz };
