import React from 'react';
import { Image, ImageSourcePropType, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

type IoniconsNames = ComponentProps<typeof Ionicons>['name'];

type TabBarIconProps = {
    focusedImageSource?: ImageSourcePropType;
    unfocusedImageSource?: ImageSourcePropType;
    focused?: boolean;
    color?: string;
    name?: IoniconsNames; // Use the correct type for Ionicons names
} & Omit<IconProps<IoniconsNames>, 'name'>;

export function TabBarIcon({
    style,
    focusedImageSource,
    unfocusedImageSource,
    focused,
    name,
    color,
    ...rest
}: TabBarIconProps) {
    if (focusedImageSource && unfocusedImageSource) {
        return (
            <Image
                source={focused ? focusedImageSource : unfocusedImageSource}
                style={[styles.image]}
            />
        );
    }
    if (name) {
        return <Ionicons name={name} size={24} style={[{ marginBottom: -3 }, style]} color={color} {...rest} />;
    }
    return null; // Return null if no vector or custom icon images are provided
}

const styles = StyleSheet.create({
    image: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        marginBottom: -3,
    },
});
