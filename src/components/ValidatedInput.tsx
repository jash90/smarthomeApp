import React, { Component } from "react";
import { Text, TextInputProps } from "react-native";
import { Input } from "./StyledComponent";

interface Props extends TextInputProps {
    error?: boolean | null;
    errorText?: string;
}

interface State {
    validate: boolean;
}

export default class ValidatedInput extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            validate: false
        };
    }

    static defaultProps = {
        underlineColorAndroid: "transparent",
        value: "text"
    };

    public validate() {
        this.setState({ validate: true });
    }

    public static validate(refs: any[]): boolean {
        let validate = true;
        refs.forEach((ref: ValidatedInput | null | undefined) => {
            if (ref) {
                ref.validate();
                validate && !ref.props.error;
            }
        });
        return validate;
    }

    render() {
        return (
            <>
                <Input
                    autoCapitalize={this.props.autoCapitalize}
                    underlineColorAndroid={this.props.underlineColorAndroid}
                    placeholder={this.props.placeholder}
                    secureTextEntry={this.props.secureTextEntry}
                    onChangeText={this.onChangeText}
                    value={this.props.value}
                    multiline={this.props.multiline}
                />
                {this.props.error && this.state.validate && (
                    <Text
                        style={{
                            fontSize: 12,
                            color: "red",
                            paddingVertical: 2,
                            paddingLeft: 15
                        }}
                    >
                        {this.props.errorText}
                    </Text>
                )}
            </>
        );
    }

    onChangeText = (text: string) => {
        this.setState({ validate: false });
        if (this.props.onChangeText) this.props.onChangeText(text);
    };
}
