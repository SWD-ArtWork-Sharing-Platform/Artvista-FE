"use client";
import Loading from "@/components/Loading/Loading";
import useAppContext from "@/hooks/useAppContext";
import { AuthUser } from "@/types/authentication";
import { Form, Input } from "antd";
import type { NextPage } from "next";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  firebaseStorage,
  uploadBytes,
  listAll,
  getDownloadURL,
  refStorage,
  deleteObject,
} from "@/config/firebaseConfig";
import { getUserInfo, getUserInfoId, setUserInfo } from "@/utils/utils";
import { useFormik } from "formik";
import TextArea from "antd/es/input/TextArea";
import authApi from "@/api/auth/auth";
import { PATH_SHOP } from "@/routes/paths";
import { ref } from "firebase/storage";
import { getUserAvatar } from "@/utils/useFirebaseStorage";
import sweetAlert from "@/utils/sweetAlert";

const ProfileComponent: NextPage = () => {
  const params = useParams();
  const userId = params.userId as string;
  const router = useRouter();
  const [form] = Form.useForm();
  const [userLogin, setUserLogin] = useState<AuthUser | null>(null);
  const [currentAvatar, setCurrentAvatar] = useState<string | null>(null);
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isLoading, enableLoading, disableLoading } = useAppContext();
  const imageListRef = refStorage(firebaseStorage, "userImages/");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      phoneNumber: "",
      email: "",
      address: "",
    },

    onSubmit: async (values) => {
      console.log(values);
      enableLoading();
      if (previewImg && previewImg != currentAvatar) {
        changeAvatarImage(userLogin?.id ?? "", imageUpload);
      }
      console.log({
        id: userLogin ? userLogin.id : "",
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        address: values.address,
      });
      const a = authApi
        .updateAccount(
          userLogin ? userLogin.id : "",
          values.name,
          values.phoneNumber,
          values.address
        )
        .then((response) => {
          console.log(response);
          if (response.data.isSuccess) {
            setUserInfo({
              id: userLogin ? userLogin.id : "",
              name: values.name,
              email: values.email,
              phoneNumber: values.phoneNumber,
              address: values.address,
              role: userLogin ? userLogin.role : [],
            });
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          router.push(PATH_SHOP.profile(userLogin ? userLogin.id : ""));
          sweetAlert.alertSuccess("Update Profile Successfully", "", 1800, 22);
          disableLoading();
        });
    },
  });

  const setUserAvatar = async (USER_LOGIN: any) => {
    try {
      const avatarUrl = await getUserAvatar(USER_LOGIN.id);
      setCurrentAvatar(avatarUrl);
    } catch (error) {
      console.error("Error setting avatar:", error);
    }
  };

  useEffect(() => {
    enableLoading();

    const USER_INFO = getUserInfo();
    const USER_LOGIN = JSON.parse(USER_INFO ?? "");
    setUserLogin(USER_LOGIN != "" ? USER_LOGIN : null);

    if (USER_LOGIN != "") {
      formik.setValues({
        name: USER_LOGIN.name ?? "",
        phoneNumber: USER_LOGIN.phoneNumber ?? "",
        email: USER_LOGIN.email ?? "",
        address: USER_LOGIN.address ?? "",
      });
    }

    setUserAvatar(USER_LOGIN);
  }, []);

  useEffect(() => {
    if (userLogin) {
      disableLoading();
    }
  }, [userLogin]);

  const changeAvatarImage = async (imageName: string, newImageFile: any) => {
    try {
      const imagePath = `userImages/${imageName}`;

      if (currentAvatar?.includes(userLogin?.id)) {
        const storagePath = decodeURIComponent(
          new URL(currentAvatar ?? "").pathname
        );
        console.log(storagePath);

        const imageRef = ref(
          firebaseStorage,
          "userImages" + storagePath.split("userImages")[1]
        );
        await deleteObject(imageRef);
      }

      const newImageRef = ref(firebaseStorage, imagePath);
      await uploadBytes(newImageRef, newImageFile)
        .then((snapshot) => {
          console.log("Uploaded a file!", snapshot);
          const storageRef = ref(firebaseStorage, `userImages/${imageName}`);
          return getDownloadURL(storageRef);
        })
        .then((downloadURL) => {
          setCurrentAvatar(downloadURL);
          setPreviewImg(null);
          setImageUpload(null);
          disableLoading();
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } catch (error) {
      console.error("Error deleting/uploading image:", error);
    }
  };

  if (!userLogin || !currentAvatar) {
    return (
      <>
        <Loading loading={isLoading} />
      </>
    );
  }

  return (
    <>
      <Loading loading={isLoading} />
      <div className="flex-1 flex flex-col items-end justify-start gap-[5.438rem_0rem] max-w-full text-left text-[1.5rem] text-bg font-barlow mq800:gap-[2.688rem_0rem] mq450:gap-[1.375rem_0rem]">
        <div className="self-stretch flex flex-col items-end justify-start gap-[0.625rem_0rem] max-w-full">
          <div className="w-[85rem] flex flex-row items-start justify-between max-w-full gap-[1.25rem] mq1350:flex-wrap">
            <div className="w-[25rem] flex flex-col items-start justify-start pt-[0.8rem] px-[0rem] pb-[0rem] box-border">
              <div className="self-stretch flex flex-col items-end justify-start gap-[0.938rem_0rem]">
                <div className="self-stretch flex flex-col items-center justify-start">
                  {previewImg ? (
                    <>
                      <>
                        <img
                          style={{
                            boxShadow:
                              "#ffffff 0px 0px 0px, #ffffffb3 0px 7px 13px -3px, #ffffffe4 0px -3px 0px inset",
                          }}
                          className="w-[8rem] h-[8rem] rounded-[50%] object-cover z-[1]"
                          loading="lazy"
                          alt=""
                          key={previewImg}
                          src={previewImg}
                        />
                      </>
                    </>
                  ) : (
                    <>
                      <img
                        style={{
                          boxShadow:
                            "#ffffff 0px 0px 0px, #ffffffb3 0px 7px 13px -3px, #ffffffe4 0px -3px 0px inset",
                        }}
                        className="w-[8rem] h-[8rem] rounded-[50%] object-cover z-[1]"
                        loading="lazy"
                        alt=""
                        key={currentAvatar}
                        src={currentAvatar ?? "/images/avatar/avatar.png"}
                      />
                    </>
                  )}
                  {!previewImg ? (
                    <>
                      <div
                        className="mt-5 header_btn_hover flex cursor-pointer flex-row items-center justify-center whitespace-nowrap rounded-full bg-primary-colour px-6 py-4 text-center text-base text-neutral-white"
                        onClick={() => {
                          if (fileInputRef && fileInputRef.current)
                            fileInputRef.current.click();
                        }}
                      >
                        <div className="relative font-semibold leading-[1px]">
                          Change Avatar
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="mt-5 header_btn_hover flex cursor-pointer flex-row items-center justify-center whitespace-nowrap rounded-full bg-primary-colour px-6 py-4 text-center text-base text-neutral-white"
                        onClick={() => {
                          if (fileInputRef && fileInputRef.current)
                            fileInputRef.current.click();
                        }}
                      >
                        <div className="relative font-semibold leading-[1px]">
                          Choose Another Photo
                        </div>
                      </div>
                      <div
                        className="mt-3 header_btn_hover flex cursor-pointer flex-row items-center justify-center whitespace-nowrap rounded-full bg-black px-6 py-4 text-center text-base text-neutral-white"
                        onClick={() => {
                          setPreviewImg(null);
                          setImageUpload(null);
                        }}
                      >
                        <div className="relative font-semibold leading-[1px]">
                          Reset Current Avatar
                        </div>
                      </div>
                    </>
                  )}
                  <div className="text-center flex flex-col items-center justify-start py-[0rem] px-[1.25rem] gap-[0.813rem_0rem]">
                    <div className="mt-5 relative leading-[1.5rem] font-semibold mq450:text-[1.188rem] mq450:leading-[1.188rem]">
                      {userLogin.name}
                      <div className="text-[1rem] mt-3 relative leading-[1.5rem] font-semibold mq450:text-[1.188rem] mq450:leading-[1.188rem]">
                        Email: {userLogin.email}
                      </div>
                      <div className="text-[1rem] mt-3 relative leading-[1.5rem] font-semibold mq450:text-[1.188rem] mq450:leading-[1.188rem]">
                        Phone: {userLogin.phoneNumber}
                      </div>
                      {userLogin.address && userLogin.address != "" ? (
                        <>
                          <div className="text-[1rem] mt-3 relative leading-[1.5rem] font-semibold mq450:text-[1.188rem] mq450:leading-[1.188rem]">
                            Address: {userLogin.address}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[60rem] self-stretch flex flex-row flex-wrap items-start justify-start max-w-full text-center text-[1.25rem]">
              <Form
                onFinish={formik.handleSubmit}
                form={form}
                size="large"
                autoComplete="off"
                className="w-full"
              >
                <div className="row align-items-start justify-content-between">
                  <p className="text-start text-white relative self-stretch pb-1 text-lg font-medium leading-[28px]">
                    <span>
                      Fullname
                      <span className="text-red">*</span>
                    </span>
                  </p>
                  <Form.Item
                    className="text-start col-sm-12 col-md-7 mx-0 px-0"
                    name="name"
                    label=""
                    rules={[
                      {
                        required: true,
                        message: "Fullname cannot be blank",
                      },
                      {
                        message: "Fullname is not in correct form",
                        pattern:
                          /^(([\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{0,}[\S^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,})|([\S^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,1}))$/,
                      },
                    ]}
                    hasFeedback
                    initialValue={userLogin?.name ?? ""}
                  >
                    <Input
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      placeholder="Enter fullname"
                    />
                  </Form.Item>
                </div>

                {/* <div className="row align-items-start justify-content-between">
                <p className="text-start text-white relative self-stretch pb-1 text-lg font-medium leading-[28px]">
                  <span>
                    Email
                    <span className="text-red">*</span>
                  </span>
                </p>
                <Form.Item
                  className="text-start col-sm-12 col-md-7 mx-0 px-0"
                  name="email"
                  label=""
                  rules={[
                    {
                      required: true,
                      message: "Email cannot be blank",
                    },
                    {
                      type: "email",
                      message: "Email is not in correct form",
                    },
                  ]}
                  style={{
                    display: `${registerByEmail ? "none" : ""}`,
                  }}
                  hasFeedback
                >
                  <Input
                    id="input_email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    placeholder="Enter email"
                  />
                </Form.Item>
                <p
                  className="text-start col-sm-12 col-md-7 m-0 mb-4 p-0 ps-1"
                  style={{
                    display: `${!registerByEmail ? "none" : ""}`,
                    transform: "translateY(5px)",
                  }}
                >
                  {emailRegisterByEmail}
                </p>
              </div> */}

                <div className="row align-items-start justify-content-between">
                  <p className="text-start text-white relative self-stretch pb-1 text-lg font-medium leading-[28px]">
                    <span>
                      Phone number
                      <span className="text-red">*</span>
                    </span>
                  </p>
                  <Form.Item
                    className="text-start col-sm-12 col-md-7 mx-0 px-0"
                    name="phoneNumber"
                    label=""
                    rules={[
                      {
                        required: true,
                        message: "Phone number cannot be blank",
                      },
                      {
                        message: "Phone number must be 10-11 numbers",
                        pattern: /^([0-9]{10,11})$/,
                      },
                      {
                        message: "Phone number is not correct form",
                        pattern:
                          /^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/,
                      },
                    ]}
                    hasFeedback
                    initialValue={userLogin?.phoneNumber ?? ""}
                  >
                    <Input
                      style={{ width: "100%" }}
                      name="phoneNumber"
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      placeholder="Enter phone number"
                    />
                  </Form.Item>
                </div>

                {/* <div className="row align-items-start justify-content-between">
                <p className="text-start text-white relative self-stretch pb-1 text-lg font-medium leading-[28px]">
                  <span>
                    Password
                    <span className="text-red">*</span>
                  </span>
                </p>
                <Form.Item
                  className="text-start col-sm-12 col-md-7 mx-0 px-0"
                  name="password"
                  label=""
                  rules={[
                    {
                      required: true,
                      message: "Password cannot be blank",
                    },
                    {
                      min: 6,
                      message: "Password is at least 6 characters",
                    },
                    {
                      pattern: /[a-zA-Z]/,
                      message: "Password must have at least one letter",
                    },
                    {
                      pattern: /\d/,
                      message: "Password must have at least one digit",
                    },
                    {
                      pattern: /[^a-zA-Z\d]/,
                      message:
                        "Password must have at least one non-alphanumeric character",
                    },
                    {
                      pattern: /[A-Z]/,
                      message:
                        "Password must have at least one uppercase letter",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    name="password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    placeholder="Enter password"
                  />
                </Form.Item>{" "}
              </div>

              <div className="row align-items-start justify-content-between">
                <p className="text-start text-white relative self-stretch pb-1 text-lg font-medium leading-[28px]">
                  <span>
                    Confirm password
                    <span className="text-red">*</span>
                  </span>
                </p>
                <Form.Item
                  className="text-start col-sm-12 col-md-7 mx-0 px-0"
                  name="confirm_password"
                  label=""
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Confirm password is required",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          "Confirm password does not match"
                        );
                      },
                    }),
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    name="confirm_password"
                    type="password"
                    placeholder="Enter password again"
                  />
                </Form.Item>
              </div> */}

                <div className="row align-items-start justify-content-between">
                  <p className="text-start text-white relative self-stretch pb-1 text-lg font-medium leading-[28px]">
                    <span>Address</span>
                  </p>
                  <Form.Item
                    className="text-start col-sm-12 col-md-7 mx-0 px-0"
                    name="address"
                    label=""
                    rules={[
                      {
                        required: false,
                      },
                      {
                        pattern: /^(([]{0,0})|([\w]{1,1}[\w\s,]{0,}))$/,
                        message: "Address is not in correct form",
                      },
                    ]}
                    hasFeedback
                    initialValue={userLogin?.address ?? ""}
                  >
                    <TextArea
                      name="address"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      placeholder="Enter address (Optional)"
                    />
                  </Form.Item>
                </div>

                <Form.Item className="text-center">
                  <button
                    type="submit"
                    className="hover:bg-blueviolet box-border flex w-full max-w-full flex-1 cursor-pointer flex-row items-start justify-center overflow-hidden whitespace-nowrap rounded-md bg-primary-colour px-5 py-[10px] [border:none]"
                  >
                    <div className="font-barlow relative flex w-full items-center justify-center text-center text-lg font-medium text-neutral-white">
                      Save
                    </div>
                  </button>
                  <button
                    type="reset"
                    onClick={() => {
                      form.resetFields();
                      formik.setValues({
                        name: userLogin.name ?? "",
                        phoneNumber: userLogin.phoneNumber ?? "",
                        email: userLogin.email ?? "",
                        address: userLogin.address ?? "",
                      });
                      setPreviewImg(currentAvatar);
                      setImageUpload(null);
                    }}
                    className="mt-4 hover:bg-blueviolet box-border flex w-full max-w-full flex-1 cursor-pointer flex-row items-start justify-center overflow-hidden whitespace-nowrap rounded-md bg-black px-5 py-[10px] [border:none]"
                  >
                    <div className="font-barlow relative flex w-full items-center justify-center text-center text-lg font-medium text-neutral-white">
                      Reset
                    </div>
                  </button>
                </Form.Item>
              </Form>
              <input
                ref={fileInputRef}
                style={{
                  width: "100%",
                  cursor: "pointer",
                  display: "none",
                }}
                name="img"
                placeholder="Select Image"
                id="imgInp"
                type="file"
                onChange={(e) => {
                  const fileList = e.target.files;
                  if (fileList && fileList.length > 0) {
                    setImageUpload(fileList[0]);
                    const file = fileList[0];
                    const link = URL.createObjectURL(file);
                    setPreviewImg(link);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileComponent;
