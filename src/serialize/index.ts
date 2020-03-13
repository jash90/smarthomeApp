class Serialize {
    public static async this(clazzName: Clazz, variables: any) {
        try {
            clazz
                .find((clazzz: any) => clazzz.name == clazzName)
                .serializable.forEach((element: string) => {
                    if (Array.isArray(variables)) {
                        variables.map((variable: any) => {
                            variable[element] = JSON.parse(variable[element]);
                        });
                    } else {
                        variables[element] = JSON.parse(variables[element]);
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }
}

const clazz: any[] = [
    { name: "types", serializable: ["values"] },
    { name: "controls", serializable: ["value"] }
];

class Deserialize {
    public static async this(clazzName: Clazz, variables: any) {
        try {
            clazz
                .find((clazzz: any) => clazzz.name == clazzName)
                .serializable.forEach((element: string) => {
                    if (Array.isArray(variables)) {
                        variables.map((variable: any) => {
                            variable[element] = String(variable[element]);
                            console.log(String(variable[element]));
                        });
                    } else {
                        variables[element] = String(variables[element]);
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }
}

enum Clazz {
    types = "types",
    controls = "controls"
}

export { Serialize, Deserialize, Clazz };
