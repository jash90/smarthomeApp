import Toast from 'react-native-simple-toast';
class Serialize {
    public static async this(clazzName: Clazz, variables: any) {
        let field;
        try {
            clazz
                .find((clazzz: any) => clazzz.name == clazzName)
                .serializable.forEach((element: string) => {
                    field = element;
                    if (Array.isArray(variables)) {
                        variables.map((variable: any) => {
                            if (variable[element]) variable[element] = JSON.parse(variable[element]);
                        });
                    } else {
                        variables[element] = JSON.parse(variables[element]);
                    }
                });
        } catch (error) {
            Toast.show(`Error Serialize : Class ${clazzName} field ${field}`, Toast.LONG);
        }
    }
}

const clazz: any[] = [
    { name: "type", serializable: ["values"] },
    { name: "control", serializable: ["value"] },
];

class Deserialize {
    public static async this(clazzName: Clazz, variables: any) {
        let field;
        try {
            clazz
                .find((clazzz: any) => clazzz.name == clazzName)
                .serializable.forEach((element: string) => {
                    field = element;
                    if (Array.isArray(variables)) {
                        variables.map((variable: any) => {
                            variable[element] = String(variable[element]);
                        });
                    } else {
                        variables[element] = String(variables[element]);
                    }
                });
        } catch (error) {
            Toast.show(`Error Deserialize : Class ${clazzName} field ${field}`, Toast.LONG);
        }
    }
}

enum Clazz {
    type = "type",
    control = "control"
}

export { Serialize, Deserialize, Clazz };
