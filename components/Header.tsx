import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

type HeaderButton = {
    child: JSX.Element;
    onPress?: () => void;
};

type Props = {
    leftButton?: HeaderButton;
    rightButton?: HeaderButton;
};

export const Header = (props: Props) => {
    const { leftButton, rightButton } = props;

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                {leftButton && (
                    <TouchableOpacity onPress={leftButton.onPress}>
                        {React.cloneElement(leftButton.child, { style: styles.icon })}
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.middleContainer}>
                <Image
                    source={require('../assets/header_logo.png')}
                    style={styles.headerIcon}
                />
            </View>

            <View style={styles.rightContainer}>
                {rightButton && (
                    <TouchableOpacity onPress={rightButton.onPress}>
                        {React.cloneElement(rightButton.child, { style: styles.icon })}
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 2,
        paddingHorizontal: 2,
    },
    leftContainer: {
        flex: 1,
        alignItems: 'flex-start',
        paddingLeft: 20,
    },
    rightContainer: {
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: 20,
    },
    middleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    headerIcon: {
        height: 70,
        width: 70,
        resizeMode: 'contain',
    },
    icon: {
        height: 24,
        width: 24,
        resizeMode: 'contain',
    },
});