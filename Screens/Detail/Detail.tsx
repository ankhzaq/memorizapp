import React, { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { Text, View } from 'react-native';
import { Info, Item, ItemWithId } from '../../types/item';
import CustomButton from '../../Components/CustomButton';
import styles from './styles';
import { SECTION_QUICK, SECTION_COMPLETE } from '../../utils/constants';
import CustomInput from '../../Components/CustomInput';
import { useTranslation } from 'react-i18next';
import { clearFormValues } from '../../utils/form';
import { useApiService } from '../../hooks/useApiService';
import { ROUTE_HOME } from '../../config';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../../App';
import Tags from '../../Components/Tags';

const DEFAULT_INFO = {
  answer: '',
  question: ''
}

const Detail = ({ route }) => {
  const { t } = useTranslation();
  const { addItem, updateItem } = useApiService();
  const { control, register, handleSubmit, watch, formState: { errors } } = useForm();
  const dataItem: ItemWithId = route.params?.data;
  const editMode = Boolean(route.params?.data);
  const [section, setSection] = useState(dataItem?.type || SECTION_QUICK);

  const [infos, setInfos] = useState<Info[]>(editMode ? dataItem.info :[DEFAULT_INFO]);
  const navigation = useNavigation<StackNavigation>();

  const onSectionType = (nextSection: typeof SECTION_QUICK | typeof SECTION_COMPLETE) => {
    if (section !== nextSection) setSection(nextSection);
  }

  const updateDataItem = (data) => {
    const dataCleaned: Item = clearFormValues(data);

    const originalData = route.params.data;

    const dataUpdated = {
      ...originalData,
      info: getInfo(data),
      tags: JSON.parse(data.tags),
      updatedAt: new Date().toISOString()
    };

    updateItem(originalData.id, dataUpdated).then(() => {
      navigation.navigate(ROUTE_HOME);

    })
      .catch((error) => {
        console.log('failure - itemUpdated');
      });
  }

  const getInfo = (dataForm) => {
    return (
      [{
        answer: dataForm.answer,
        question: dataForm.question,
      }]
    )
  }

  const addDataItem = (data) => {
    const item: Item = {
      createdAt: new Date().toISOString(),
      info: getInfo(data),
      tags: JSON.parse(data.tags),
      images: [],
      email: 'unnamed@gmail.com',
      type: section,
      updatedAt: editMode ? new Date().toISOString() : undefined,
    };

    const itemCleaned: Item = clearFormValues(item);

    addItem(itemCleaned).then(() => {
      navigation.navigate(ROUTE_HOME);
    })
      .catch((error) => {
        console.log('failure - itemAdded');
      });
  }

  const onSubmit = data => {
    if (editMode) updateDataItem(data);
    else addDataItem(data);
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
            <Tags
              defaultTags={dataItem?.tags ? dataItem?.tags : value}
              onChangeTags={(nextValue) => onChange(JSON.stringify(nextValue))}
            />
          )}
          name="tags"
          rules={{ required: true }}
        />
      </View>
      {infos.map((info: Info) => (
        <View>
          <View style={styles.input}>
            <Controller
              control={control}
              render={({field: { onChange, onBlur, value }}) => (
                <CustomInput
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  placeholder={t('detail:form.placeholders.question')}
                  defaultValue={info.question}
                />
              )}
              name="question"
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
                  placeholder={t('detail:form.placeholders.description')}
                  defaultValue={info.answer}
                />
              )}
              name="answer"
              rules={{ required: true }}
            />
          </View>
        </View>
      ))}
      <CustomButton
        onPress={handleSubmit(onSubmit)}
        text={t('detail:submitBtn')}
      />
    </View>
  );
};

export default Detail;
