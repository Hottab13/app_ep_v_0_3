import React, { useEffect } from 'react';
import classes from "./users.module.css";
import { NavLink } from "react-router-dom";
import Paginator from "../common/FormControl/Paginater/Paginator";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Image, Input } from "antd";
import { Container, Row, Col } from 'react-grid-system';
import { AntDesignOutlined, AudioOutlined } from "@ant-design/icons";
import Loader from '../Loader';
import { FilterType, getNests } from '../../redux/NestsReducer';
import { AppStateType } from '../../redux/ReduxStore';
import { Table, Tag, Space,Tooltip } from 'antd';


const { Search } = Input;

export const Nests: React.FC = (props) => {
  const filter = useSelector((state: AppStateType) => state.nests.filter);
  const nests = useSelector((state: AppStateType) => state.nests.nests);
  const pagination = useSelector(
    (state: AppStateType) => state.nests.pagination
  );
  const loading = useSelector((state: AppStateType) => state.nests.isFetching);
  const dispatch = useDispatch();
  useEffect(() => {
    //dispatch(getUsersThunkCreator(currentPage, pageSaze, filter));
    dispatch(getNests(pagination, filter));
  }, []);

  const handleTableChange = (paginationEdit: any) => {
    dispatch(getNests(paginationEdit, filter));
  };
  const onFilterCheang = (filter: FilterType) => {
    dispatch(getNests(pagination, filter));
  };
  const columns = [
    {
      title: "Название",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: 120,
      sorter: (a: { name: string }, b: { name: string }) => {
        //a.name.length - b.name.length,
        const nameA = a.name.toLowerCase(),
          nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      },
      ellipsis: {
        showTitle: false,
      },
      render: (name: {} | null | undefined) => (
        <Tooltip placement="topLeft" title={name}>
          {name}
        </Tooltip>
      ),
    },
    {
      title: "Тип",
      dataIndex: "type",
      key: "type",
      width: 100,
      filters: [
        {
          text: "Активный отдых",
          value: "Активный отдых",
        },
        {
          text: "Другое",
          value: "Другое",
        },
        {
          text: "Релакс",
          value: "Релакс",
        },
      ],
      ellipsis: {
        showTitle: false,
      },
      render: (type: {} | null | undefined) => (
        <Tooltip placement="topLeft" title={type}>
          {type}
        </Tooltip>
      ),
      onFilter: (value: any, record: { type: string | any[] }) =>
        record.type.indexOf(value) === 0,
    },
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      width: 100,
    },
    {
      title: "Время",
      dataIndex: "time",
      key: "time",
      width: 80,
    },
    {
      title: "Адресс",
      dataIndex: "location",
      key: "address",
      width: 150,
      sorter: (a: { location: string }, b: { location: string }) => {
        const nameA = a.location.toLowerCase(),
          nameB = b.location.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      },
      ellipsis: {
        showTitle: false,
      },
      render: (location: {} | null | undefined) => (
        <Tooltip placement="topLeft" title={location}>
          {location}
        </Tooltip>
      ),
    },
    {
      title: "Свободных мест",
      dataIndex: "amountMaximum",
      key: "amountMaximum",
      width: 100,
      sorter: (a: { amountMaximum: number }, b: { amountMaximum: number }) =>
        a.amountMaximum - b.amountMaximum,
    },
    {
      title: "Организатор",
      dataIndex: "user",
      key: "users",
      width: 100,
      render: (user: any) => (
        <NavLink to={`profile/` + user.id}>
          {" "}
          <Avatar
            style={{ backgroundColor: "#87d068" }}
            size={{
              xs: 24,
              sm: 32,
              md: 40,
              lg: 64,
              xl: 80,
              xxl: 100,
            }}
            /*src={
                    u.photos.small != null ? 
                              u.photos.small
                             :
                  <AntDesignOutlined />*/
          >
            {" "}
            {user.name}
          </Avatar>
        </NavLink>
      ),
    },
    /*{
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: any[]) => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },*/
    {
      title: "Действия",
      key: "action",
      fixed: "right",
      width: 100,
      render: (text: any, record: { name: React.ReactNode }) => (
        <Space size="middle">
          {/*record.name*/}
          <a>Присоедениться </a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  //tags: ['nice', 'developer'],
  return (
    <Container fluid>
      <UserSearchForm onFilterCheang={onFilterCheang} />
      <div style={{ marginTop: "50px" }}>
        <Table
          //@ts-ignore
          columns={columns}
          dataSource={nests}
          pagination={pagination}
          onChange={handleTableChange}
          loading={loading}
          scroll={{ x: 850 }}
        />
        {/*nests.map((u) => (
          <Row key={u.id} style={{ marginTop: "12px" }}>
            <Col md={5} debug>
              <NavLink to={`profile/` + u.id}>
              <h1>{u.name}</h1>
              </NavLink>
                <p>Тип:{u.type}</p>
                <p>Возрастное ограничение:{u.ageRestrictions}</p>
                <p>Мест:{u.amountMaximum}</p>
              <div style={{ marginTop: "20px" }}>
                {/*u.followed ? (
                        <Button
                          disabled={followingInProgress.some(
                            (id) => id === u.id
                          )}
                          onClick={() => {
                            unfollowinFC(u.id);
                          }}
                        >
                          Отписаться
                        </Button>
                      ) : (
                        <Button
                          type="primary"
                          disabled={followingInProgress.some(
                            (id) => id === u.id
                          )}
                          onClick={() => {
                            followingFC(u.id);
                          }}
                        >
                          Подписаться
                        </Button>
                        )}
              </div>
            </Col>
            <Col md={4} debug>
              <p>Место:{u.location}</p>
              <p>Дата:{u.date}</p>
              <p>Время:{u.time}</p>
            </Col>
            <Col md={3} debug>
              <NavLink to={`profile/` + u.user.id}>
              <Avatar
                  style={{ backgroundColor: "#87d068" }}
                  size={{
                    xs: 24,
                    sm: 32,
                    md: 40,
                    lg: 64,
                    xl: 80,
                    xxl: 100,
                  }}
                  /*src={
                    u.photos.small != null ? 
                              u.photos.small
                             :
                    <AntDesignOutlined />}
                > {u.user.name}</Avatar>
              </NavLink>
            </Col>
          </Row>
                  ))*/}
      </div>
    </Container>
  );
};

const userSearchFormValidate = (values: any) => {
  const errors = {};
  return errors;
};
type userSearchFormPropsType = {
  onFilterCheang: (filter: FilterType) => void;
};

export const UserSearchForm: React.FC<userSearchFormPropsType> = React.memo(
  (props) => {
    const submit = (
      values: FilterType,
      { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
      props.onFilterCheang(values);
    };
    const suffix = (
      <AudioOutlined
        style={{
          fontSize: 16,
          color: '#1890ff',
        }}
      />
    );
    const onSearch = (value: any) => console.log(value)
    return (<div>
      <Search
      placeholder="поиск гнезда..."
      allowClear
      //onSearch={submit}
      style={{ width: 200, margin: '0 10px' }}
      />
      <Formik
        initialValues={{ term: "", friend: null }}
        validate={userSearchFormValidate}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="term" />
            <Field name="friend" as="select">
              <option value="null">Все</option>
              <option value="true">Друзья</option>
              <option value="false">Остальные</option>
            </Field>
            <button
              type="submit"
              //disabled={isSubmitting}
            >
              Искать
            </button>
          </Form>
        )}
      </Formik>
      </div>
    );
  }
);
//export default Users style={{border:"1px solid #ccc", borderRadius: "2%"}}