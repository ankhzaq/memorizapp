import React, { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { Text, View } from 'react-native';
import { Item,ItemWithId } from '../../types/item';
import CustomButton from '../../Components/CustomButton';
import styles from './styles';
import { SECTION_QUICK, SECTION_COMPLETE } from '../../utils/constants';
import CustomInput from '../../Components/CustomInput';
import { useTranslation } from 'react-i18next';
import { clearFormValues } from '../../utils/form';
import { useApiService } from '../../hooks/useApiService';
import { ROUTE_DETAIL, ROUTE_HOME } from '../../config';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../../App';

const Detail = ({ route }) => {
  const { t } = useTranslation();
  const { addItem } = useApiService();
  const { control, register, handleSubmit, watch, formState: { errors } } = useForm();
  const dataItem: ItemWithId = route.params?.data;
  const editMode = Boolean(route.params?.data);
  const [section, setSection] = useState(dataItem?.type || SECTION_QUICK);
  const navigation = useNavigation<StackNavigation>();

  const onSectionType = (nextSection: typeof SECTION_QUICK | typeof SECTION_COMPLETE) => {
    if (section !== nextSection) setSection(nextSection);
  }

  const onSubmit = data => {
    const item: Item = {
      createdAt: new Date().toISOString(),
      description: data.description,
      tags: data.tags || [],
      images: [],
      email: 'unnamed@gmail.com',
      type: section,
      updatedAt: editMode ? new Date().toISOString() : undefined,
      value: data.value || 1,
    };

    const itemCleaned: Item = clearFormValues(item);
    addItem(itemCleaned).then(() => {
      navigation.navigate(ROUTE_HOME);
    })
      .catch((error) => {
        console.log('failure - itemCleaned');
      });
  }

  return (
    <View style={styles.layout}>
      <Text>DETAIL</Text>
      <View style={styles.sections}>
        <CustomButton
          onPress={() => onSectionType(SECTION_QUICK)}
          outlined={section === SECTION_COMPLETE}
          style={styles.firstSection}
          text={t('detail:sections.quick')}
        />
        <CustomButton
          disabled
          onPress={() => onSectionType(SECTION_COMPLETE)}
          outlined={section === SECTION_QUICK}
          text={t('detail:sections.complete')}
        />
      </View>
      <View style={styles.input}>
        <Controller
          control={control}
          render={({field: { onChange, onBlur, value }}) => (
            <CustomInput
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              placeholder={t('detail:form.placeholders.tags')}
              value={value}
            />
          )}
          name="tags"
          rules={{ required: true }}
        />
      </View>
      <View style={styles.input}>
        <Controller
          control={control}
          render={({field: { onChange, onBlur, value }}) => (
            <CustomInput
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              placeholder={t('detail:form.placeholders.value')}
              value={value}
            />
          )}
          name="value"
          rules={{ required: false }}
        />
      </View>
      <View style={styles.input}>
        <Controller
          control={control}
          render={({field: { onChange, onBlur, value }}) => (
            <CustomInput
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              placeholder={t('detail:form.placeholders.description')}
              value={value}
            />
          )}
          name="description"
          rules={{ required: false }}
        />
      </View>
      <CustomButton
        onPress={handleSubmit(onSubmit)}
        text={t('detail:submitBtn')}
      />
    </View>
  );
};

export default Detail;
