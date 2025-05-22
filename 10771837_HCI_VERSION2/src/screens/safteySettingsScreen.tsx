// src/screens/settings/SafetySettingsScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Modal,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../styles/settingsScreenStyles';

// Additional safety-specific styles
const safetyStyles = {
  contactItem: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5E5',
  },
  contactInfo: {
    flex: 1,
    marginLeft: 15,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '500' as const,
  },
  contactNumber: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  addButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: 15,
  },
  addButtonText: {
    color: '#007AFF',
    fontSize: 16,
    marginLeft: 10,
  },
  inputRow: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  modalActions: {
    flexDirection: 'row' as const,
    justifyContent: 'flex-end' as const,
    marginTop: 15,
  },
  actionButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: '#F2F2F7',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500' as const,
  },
  cancelButtonText: {
    color: '#000',
  },
  saveButtonText: {
    color: 'white',
  },
  location: {
    fontSize: 16,
    marginVertical: 5,
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
};

// Emergency contact interface
interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
}

const SafetySettingsScreen: React.FC = () => {
  // State for safety settings
  const [safetyAlertsEnabled, setSafetyAlertsEnabled] = useState<boolean>(true);
  const [autoShareLocation, setAutoShareLocation] = useState<boolean>(true);
  const [sosEnabled, setSosEnabled] = useState<boolean>(true);
  const [safetyCheckEnabled, setSafetyCheckEnabled] = useState<boolean>(false);
  
  // State for emergency contacts
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    { id: '1', name: 'John Doe', phone: '+1 (555) 123-4567' },
    { id: '2', name: 'Jane Smith', phone: '+1 (555) 987-6543' },
  ]);
  
  // State for contact modal
  const [contactModalVisible, setContactModalVisible] = useState<boolean>(false);
  const [newContactName, setNewContactName] = useState<string>('');
  const [newContactPhone, setNewContactPhone] = useState<string>('');
  const [editingContactId, setEditingContactId] = useState<string | null>(null);

  // Toggle safety alerts
  const toggleSafetyAlerts = (): void => {
    setSafetyAlertsEnabled(previous => !previous);
  };

  // Toggle auto-share location
  const toggleAutoShareLocation = (): void => {
    setAutoShareLocation(previous => !previous);
  };

  // Toggle SOS feature
  const toggleSosEnabled = (): void => {
    setSosEnabled(previous => !previous);
  };

  // Toggle safety check feature
  const toggleSafetyCheckEnabled = (): void => {
    setSafetyCheckEnabled(previous => !previous);
  };

  // Open modal to add a new contact
  const openAddContactModal = (): void => {
    setNewContactName('');
    setNewContactPhone('');
    setEditingContactId(null);
    setContactModalVisible(true);
  };

  // Open modal to edit an existing contact
  const openEditContactModal = (contact: EmergencyContact): void => {
    setNewContactName(contact.name);
    setNewContactPhone(contact.phone);
    setEditingContactId(contact.id);
    setContactModalVisible(true);
  };

  // Close contact modal
  const closeContactModal = (): void => {
    setContactModalVisible(false);
  };

  // Save contact (add new or update existing)
  const saveContact = (): void => {
    if (!newContactName.trim() || !newContactPhone.trim()) {
      Alert.alert('Error', 'Please enter both name and phone number.');
      return;
    }

    if (editingContactId) {
      // Update existing contact
      setEmergencyContacts(contacts =>
        contacts.map(contact => 
          contact.id === editingContactId
            ? { ...contact, name: newContactName, phone: newContactPhone }
            : contact
        )
      );
    } else {
      // Add new contact
      const newContact: EmergencyContact = {
        id: Date.now().toString(),
        name: newContactName,
        phone: newContactPhone,
      };
      setEmergencyContacts(contacts => [...contacts, newContact]);
    }

    closeContactModal();
  };

  // Delete a contact
  const deleteContact = (contactId: string): void => {
    Alert.alert(
      'Delete Contact',
      'Are you sure you want to remove this emergency contact?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setEmergencyContacts(contacts => 
              contacts.filter(contact => contact.id !== contactId)
            );
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollViewSettings}>
        {/* Safety Alerts */}
        <View style={styles.settingSection}>
          <View style={styles.settingRow}>
            <Text style={styles.settingTitle}>Safety Alerts</Text>
            <Switch
              value={safetyAlertsEnabled}
              onValueChange={toggleSafetyAlerts}
              trackColor={{ false: '#CCCCCC', true: '#65C466' }}
              thumbColor={Platform.OS === 'ios' ? undefined : '#FFFFFF'}
              ios_backgroundColor="#CCCCCC"
            />
          </View>
          <Text style={styles.settingDescription}>
            Receive critical safety alerts for severe earthquakes in your area
          </Text>
        </View>

        {/* Auto-share Location */}
        <View style={styles.settingSection}>
          <View style={styles.settingRow}>
            <Text style={styles.settingTitle}>Auto-share Location</Text>
            <Switch
              value={autoShareLocation}
              onValueChange={toggleAutoShareLocation}
              trackColor={{ false: '#CCCCCC', true: '#65C466' }}
              thumbColor={Platform.OS === 'ios' ? undefined : '#FFFFFF'}
              ios_backgroundColor="#CCCCCC"
            />
          </View>
          <Text style={styles.settingDescription}>
            Automatically share your location with emergency contacts during an earthquake
          </Text>
        </View>

        {/* SOS Feature */}
        <View style={styles.settingSection}>
          <View style={styles.settingRow}>
            <Text style={styles.settingTitle}>SOS Button</Text>
            <Switch
              value={sosEnabled}
              onValueChange={toggleSosEnabled}
              trackColor={{ false: '#CCCCCC', true: '#65C466' }}
              thumbColor={Platform.OS === 'ios' ? undefined : '#FFFFFF'}
              ios_backgroundColor="#CCCCCC"
            />
          </View>
          <Text style={styles.settingDescription}>
            Enable the SOS button to quickly alert emergency contacts
          </Text>
        </View>

        {/* Safety Check */}
        <View style={styles.settingSection}>
          <View style={styles.settingRow}>
            <Text style={styles.settingTitle}>Safety Check</Text>
            <Switch
              value={safetyCheckEnabled}
              onValueChange={toggleSafetyCheckEnabled}
              trackColor={{ false: '#CCCCCC', true: '#65C466' }}
              thumbColor={Platform.OS === 'ios' ? undefined : '#FFFFFF'}
              ios_backgroundColor="#CCCCCC"
            />
          </View>
          <Text style={styles.settingDescription}>
            Receive safety check prompts after earthquakes in your area
          </Text>
        </View>

        {/* Emergency Contacts */}
        <View style={styles.settingSection}>
          <Text style={[styles.settingTitle, { marginBottom: 15 }]}>Emergency Contacts</Text>
          
          {emergencyContacts.map(contact => (
            <View key={contact.id} style={safetyStyles.contactItem}>
              <Ionicons name="person-circle-outline" size={28} color="#666" />
              <View style={safetyStyles.contactInfo}>
                <Text style={safetyStyles.contactName}>{contact.name}</Text>
                <Text style={safetyStyles.contactNumber}>{contact.phone}</Text>
              </View>
              <TouchableOpacity onPress={() => openEditContactModal(contact)}>
                <Ionicons name="create-outline" size={24} color="#007AFF" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={{ marginLeft: 15 }}
                onPress={() => deleteContact(contact.id)}
              >
                <Ionicons name="trash-outline" size={24} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          ))}
          
          <TouchableOpacity 
            style={safetyStyles.addButton}
            onPress={openAddContactModal}
          >
            <Ionicons name="add-circle-outline" size={24} color="#007AFF" />
            <Text style={safetyStyles.addButtonText}>Add Emergency Contact</Text>
          </TouchableOpacity>
          
          <Text style={styles.settingDescription}>
            These contacts will be notified in case of emergency
          </Text>
        </View>

        {/* Home Location */}
        <View style={styles.settingSection}>
          <Text style={[styles.settingTitle, { marginBottom: 10 }]}>Home Location</Text>
          <Text style={safetyStyles.location}>123 Main Street, Anytown, USA</Text>
          <TouchableOpacity>
            <Text style={{ color: '#007AFF', marginTop: 5 }}>Update Home Location</Text>
          </TouchableOpacity>
          <Text style={[styles.settingDescription, { marginTop: 10 }]}>
            Your home location is used for safety alerts and evacuation information
          </Text>
        </View>
      </ScrollView>

      {/* Contact Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={contactModalVisible}
        onRequestClose={closeContactModal}
      >
        <View style={safetyStyles.modal}>
          <View style={safetyStyles.modalContent}>
            <Text style={safetyStyles.modalTitle}>
              {editingContactId ? 'Edit Contact' : 'Add Contact'}
            </Text>
            
            <View style={safetyStyles.inputRow}>
              <Text style={safetyStyles.inputLabel}>Name</Text>
              <TextInput
                style={safetyStyles.input}
                value={newContactName}
                onChangeText={setNewContactName}
                placeholder="Contact Name"
              />
            </View>
            
            <View style={safetyStyles.inputRow}>
              <Text style={safetyStyles.inputLabel}>Phone Number</Text>
              <TextInput
                style={safetyStyles.input}
                value={newContactPhone}
                onChangeText={setNewContactPhone}
                placeholder="Phone Number"
                keyboardType="phone-pad"
              />
            </View>
            
            <View style={safetyStyles.modalActions}>
              <TouchableOpacity
                style={[safetyStyles.actionButton, safetyStyles.cancelButton]}
                onPress={closeContactModal}
              >
                <Text style={[safetyStyles.buttonText, safetyStyles.cancelButtonText]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[safetyStyles.actionButton, safetyStyles.saveButton]}
                onPress={saveContact}
              >
                <Text style={[safetyStyles.buttonText, safetyStyles.saveButtonText]}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SafetySettingsScreen;