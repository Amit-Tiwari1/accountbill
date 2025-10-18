import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../theme/Colors';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface AccordionProps {
    title: string;
    subtitle?: string;
    details: string;
    balance?: string;
    onExtraPress?: () => void;
}

const Accordion: React.FC<AccordionProps> = ({ title, subtitle, details, balance, onExtraPress }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={toggleExpand} style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="person" size={28} color={Colors.primary} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.title}>{title}</Text>
                        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                    </View>
                </View>
                <MaterialIcons name={expanded ? 'expand-less' : 'expand-more'} size={28} color={Colors.primary} />
            </TouchableOpacity>

            {expanded && (
                <View style={styles.body}>
                    <Text style={styles.details}>{details}</Text>
                    {balance && <Text style={styles.balance}>Balance: {balance}</Text>}

                    {onExtraPress && (
                        <TouchableOpacity style={styles.extraButton} onPress={onExtraPress}>
                            <Text style={{ color: 'white' }}>View Details</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        marginBottom: 10,
        backgroundColor: 'white',
        overflow: 'hidden',
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    title: { fontSize: 16, fontWeight: '600' },
    subtitle: { fontSize: 13, color: 'gray' },
    body: { paddingHorizontal: 15, paddingBottom: 15 },
    details: { fontSize: 14, marginBottom: 8, color: 'gray' },
    balance: { fontSize: 15, fontWeight: '600', marginBottom: 10, color: Colors.primary },
    extraButton: {
        alignSelf: 'flex-start',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: Colors.primary,
    },
});

export default Accordion;
