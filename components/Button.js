import React , { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { MaterialIndicator } from "react-native-indicators";
import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    button: {
        borderRadius: 3,
        borderWidth: 1,
        borderStyle: "solid",
        width: "auto"
    },
    title: {
        width: "auto",
        color: "white",
        fontFamily: "OpenSans-Bold",
        textAlign: "center"
    },

    /** Button sizes */
    size_l: {
        height: 50
    },
    size_m: {
        height: 40
    },
    size_s: {
        height: 32
    },

    /** Button types */
    primary: {
        backgroundColor: "green",
        borderColor: "green"
    },
    secondary: {
        backgroundColor: "black",
        borderColor: "black"
    },
    tertiary: {
        backgroundColor: "white",
        borderColor: "white"
    },

    /** Title sizes */

    title_l: {
        paddingHorizontal: 27,
        paddingVertical: 13,
        fontSize: 16,
        lineHeight: 24
    },
    title_m: {
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 10,
        fontSize: 16,
        lineHeight: 22
    },
    title_s: {
        paddingHorizontal: 9,
        paddingTop: 5,
        paddingBottom: 6,
        fontSize: 14,
        lineHeight: 20
    },

    /** Title types */
    title_primary: {
        color: "white"
    },
    title_secondary: {
        color: "white"
    },
    title_tertiary: {
        color: "green"
    },

    /** Disabled  */
    title_disabled: {
        color: "grey"
    },
    disabled: {
        backgroundColor: "transparent",
        borderColor: "grey"
    },

    /** Loading */
    loading_l: {
        marginTop: 2
    },
    loading_m: {
        marginTop: 2
    },
    loading_s: {
        marginTop: 2
    }
});

// type ButtonPropsType = {
//     onClick: () => void;
//     title: string;
//     size?: string;
//     width?: number;
//     type?: string;
//     disabled?: boolean;
//     loading?: boolean;
//     loadingColor?: string;
//     extraStyles?: any;
//     extraTitleStyles?: any;
// };

// type StylesPropTypes = {
//     [key: string]: any;
// };

const Button  = ({
    onClick,
    title,
    disabled = false,
    type = "primary",
    size = "large",
    loading = true,
    loadingColor = "#fff",
    width,
    extraStyles = {},
    extraTitleStyles = {}
}) => {
    let activeOpacity = 0.2;
    let loadingSize;
    let loadingStyle;

    const availableLoadingSizes = {
        large: 25,
        medium: 20,
        small: 15
    };

    const availableLoadingStyles = {
        large: styles.loading_l,
        medium: styles.loading_m,
        small: styles.loading_s
    };

    const availableButtonSizes = {
        large: styles.size_l,
        medium: styles.size_m,
        small: styles.size_s
    };

    const availableButtonTypes = {
        primary: styles.primary,
        secondary: styles.secondary,
        tertiary: styles.tertiary
    };

    const availableTitleSizes = {
        large: styles.title_l,
        medium: styles.title_m,
        small: styles.title_s
    };

    const availableTitleTypes = {
        primary: styles.title_primary,
        secondary: styles.title_secondary,
        tertiary: styles.title_tertiary
    };

    // Set button styles
    const buttonStyles = [];
    buttonStyles.push(styles.button);
    buttonStyles.push(availableButtonSizes[size]);
    buttonStyles.push(availableButtonTypes[type]);

    const titleStyles = [];
    titleStyles.push(styles.title);
    titleStyles.push(availableTitleSizes[size]);
    titleStyles.push(availableTitleTypes[type]);

    if (disabled) {
        buttonStyles.push(styles.disabled);
        titleStyles.push(styles.title_disabled);
        activeOpacity = 1;
    }

    if (width) {
        buttonStyles.push({
            width
        });
    }

    if (loading) {
        loadingSize = availableLoadingSizes[size];
        loadingStyle = availableLoadingStyles[size];

        if (type === "tertiary") {
            /*eslint-disable-next-line no-param-reassign*/
            loadingColor = "green"
        }
    }

    const onPress = () => {
        return !disabled && onClick && onClick();
    };

    return (
        <View style={[buttonStyles, extraStyles]}>
            {(!disabled &&
                loading && (
                    <MaterialIndicator
                        color={loadingColor}
                        size={loadingSize}
                        style={loadingStyle}
                    />
                )) || (
                <TouchableOpacity
                    onPress={onPress}
                    activeOpacity={activeOpacity}
                >
                    <Text style={[titleStyles, extraTitleStyles]}>{title}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default Button;
