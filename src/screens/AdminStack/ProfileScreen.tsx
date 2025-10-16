import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph,
  Text,
  Button,
  TextInput,
  Avatar,
  List,
  Switch,
  Divider
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('+1 234 567 8900');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const handleSaveProfile = () => {
    Alert.alert('Success', 'Profile updated successfully!');
    setIsEditing(false);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => navigation.replace('AuthStack')
        }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. Are you sure you want to delete your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Account Deleted', 'Your account has been deleted.');
            navigation.replace('AuthStack');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Profile Header */}
          <Card style={styles.profileCard}>
            <Card.Content style={styles.profileContent}>
              <Avatar.Text size={80} label="JD" style={styles.avatar} />
              <Title style={styles.profileName}>{name}</Title>
              <Paragraph style={styles.profileEmail}>{email}</Paragraph>
              <Button
                mode="outlined"
                onPress={() => setIsEditing(!isEditing)}
                style={styles.editButton}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </Card.Content>
          </Card>

          {/* Profile Information */}
          <Card style={styles.infoCard}>
            <Card.Content>
              <Title>Personal Information</Title>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name</Text>
                {isEditing ? (
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                    mode="outlined"
                  />
                ) : (
                  <Text variant="bodyLarge" style={styles.infoText}>{name}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                {isEditing ? (
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    mode="outlined"
                    keyboardType="email-address"
                  />
                ) : (
                  <Text variant="bodyLarge" style={styles.infoText}>{email}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone Number</Text>
                {isEditing ? (
                  <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    style={styles.input}
                    mode="outlined"
                    keyboardType="phone-pad"
                  />
                ) : (
                  <Text variant="bodyLarge" style={styles.infoText}>{phone}</Text>
                )}
              </View>

              {isEditing && (
                <Button
                  mode="contained"
                  onPress={handleSaveProfile}
                  style={styles.saveButton}
                >
                  Save Changes
                </Button>
              )}
            </Card.Content>
          </Card>

          {/* Settings */}
          <Card style={styles.settingsCard}>
            <Card.Content>
              <Title>Settings</Title>
              
              <List.Item
                title="Push Notifications"
                description="Receive notifications for transactions and updates"
                right={() => (
                  <Switch
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabled}
                  />
                )}
              />
              
              <Divider />
              
              <List.Item
                title="Dark Mode"
                description="Switch to dark theme"
                right={() => (
                  <Switch
                    value={darkModeEnabled}
                    onValueChange={setDarkModeEnabled}
                  />
                )}
              />
            </Card.Content>
          </Card>

          {/* Account Actions */}
          <Card style={styles.actionsCard}>
            <Card.Content>
              <Title>Account Actions</Title>
              
              <List.Item
                title="Change Password"
                description="Update your account password"
                left={(props) => <List.Icon {...props} icon="lock" />}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => Alert.alert('Change Password', 'Password change feature coming soon!')}
              />
              
              <Divider />
              
              <List.Item
                title="Export Data"
                description="Download your transaction data"
                left={(props) => <List.Icon {...props} icon="download" />}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => Alert.alert('Export Data', 'Data export feature coming soon!')}
              />
              
              <Divider />
              
              <List.Item
                title="Privacy Policy"
                description="View our privacy policy"
                left={(props) => <List.Icon {...props} icon="shield-account" />}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => Alert.alert('Privacy Policy', 'Privacy policy feature coming soon!')}
              />
            </Card.Content>
          </Card>

          {/* Danger Zone */}
          <Card style={styles.dangerCard}>
            <Card.Content>
              <Title style={styles.dangerTitle}>Danger Zone</Title>
              
              <Button
                mode="outlined"
                onPress={handleLogout}
                style={styles.logoutButton}
                textColor="#F44336"
              >
                Logout
              </Button>
              
              <Button
                mode="outlined"
                onPress={handleDeleteAccount}
                style={styles.deleteButton}
                textColor="#F44336"
              >
                Delete Account
              </Button>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  profileCard: {
    marginBottom: 20,
    elevation: 2,
  },
  profileContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatar: {
    backgroundColor: '#6200ee',
    marginBottom: 15,
  },
  profileName: {
    marginBottom: 5,
  },
  profileEmail: {
    color: '#666',
    marginBottom: 15,
  },
  editButton: {
    marginTop: 10,
  },
  infoCard: {
    marginBottom: 20,
    elevation: 2,
  },
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    marginBottom: 5,
  },
  infoText: {
    paddingVertical: 8,
    color: '#333',
  },
  saveButton: {
    marginTop: 20,
  },
  settingsCard: {
    marginBottom: 20,
    elevation: 2,
  },
  actionsCard: {
    marginBottom: 20,
    elevation: 2,
  },
  dangerCard: {
    marginBottom: 20,
    elevation: 2,
  },
  dangerTitle: {
    color: '#F44336',
    marginBottom: 15,
  },
  logoutButton: {
    marginBottom: 10,
    borderColor: '#F44336',
  },
  deleteButton: {
    borderColor: '#F44336',
  },
});

export default ProfileScreen;
