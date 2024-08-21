import InputFileInline from "@/components/UI/InputFileInline";
import Input from "@/components/UI/Input";
import ImageViewBox from "@/components/cards/ImageViewBox";

export default function StepOne({ data }) {
  return (
    <>
      <div className="p-4 rounded-lg border border-Gray-200">
        <h2 className="text-xl font-semibold pb-6 text-Gray-900">
          Basic Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Input item */}
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="post_title"
              className="text-Gray-700 text-sm font-medium "
            >
              Company:
            </label>
            <div>
              <p className="font-semibold text-Gray-900">{data.company}</p>
            </div>
          </div>
          {/* Input item */}
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="post_title"
              className="text-Gray-700 text-sm font-medium "
            >
              Company logo:
            </label>
            <div>
              <ImageViewBox src={data.company_logo} />
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 rounded-lg border border-Gray-200">
        <h2 className="text-xl font-semibold pb-6 text-Gray-900">
          Identification Documents
        </h2>
        <div className="flex flex-col gap-y-4">
          <div className="border border-Gray-200 rounded-lg p-4">
            <h4 className="text-lg font-semibold pb-3 text-Gray-900">
              Shareholders
            </h4>
            <div className="flex flex-col gap-y-4">
              {data.shareholders?.map((item, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-5 gap-2">
                  {/* Input item */}
                  <div className="flex flex-col gap-y-2">
                    <label
                      htmlFor="post_title"
                      className="text-Gray-700 text-sm font-medium "
                    >
                      Name:
                    </label>
                    <div>
                      <p className="font-semibold text-Gray-900">{item.name}</p>
                    </div>
                  </div>
                  {/* Input item */}
                  <div className="flex flex-col gap-y-2">
                    <label
                      htmlFor="post_title"
                      className="text-Gray-700 text-sm font-medium "
                    >
                      Identification:
                    </label>
                    <div>
                      <p className="font-semibold text-Gray-900">
                        {item.identification}
                      </p>
                    </div>
                  </div>
                  {/* Input item */}
                  <div className="flex flex-col gap-y-2">
                    <label
                      htmlFor="post_title"
                      className="text-Gray-700 text-sm font-medium "
                    >
                      Percentage:
                    </label>
                    <div>
                      <p className="font-semibold text-Gray-900">
                        {item.percentage}
                      </p>
                    </div>
                  </div>
                  {/* Input item */}
                  <div className="flex flex-col gap-y-2">
                    <label
                      htmlFor="post_title"
                      className="text-Gray-700 text-sm font-medium "
                    >
                      Document:
                    </label>
                    <div>
                      <ImageViewBox src={item.document} />
                    </div>
                  </div>
                  {/* Input item */}
                  <div className="flex flex-col gap-y-2">
                    <label
                      htmlFor="post_title"
                      className="text-Gray-700 text-sm font-medium "
                    >
                      Address:
                    </label>
                    <div>
                      <ImageViewBox src={item.address} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-Gray-200 rounded-lg p-4">
            <h4 className="text-lg font-semibold pb-3 text-Gray-900">
              Directors
            </h4>
            <div className="flex flex-col gap-y-4">
              {data.directors?.map((item, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-2">
                  {/* Input item */}
                  <div className="flex flex-col gap-y-2">
                    <label
                      htmlFor="post_title"
                      className="text-Gray-700 text-sm font-medium "
                    >
                      Name:
                    </label>
                    <div>
                      <p className="font-semibold text-Gray-900">{item.name}</p>
                    </div>
                  </div>
                  {/* Input item */}
                  <div className="flex flex-col gap-y-2">
                    <label
                      htmlFor="post_title"
                      className="text-Gray-700 text-sm font-medium "
                    >
                      Identification No.:
                    </label>
                    <div>
                      <p className="font-semibold text-Gray-900">
                        {item.id_no}
                      </p>
                    </div>
                  </div>

                  {/* Input item */}
                  <div className="flex flex-col gap-y-2">
                    <label
                      htmlFor="post_title"
                      className="text-Gray-700 text-sm font-medium "
                    >
                      Document:
                    </label>
                    <div>
                      <ImageViewBox src={item.document} />
                    </div>
                  </div>
                  {/* Input item */}
                  <div className="flex flex-col gap-y-2">
                    <label
                      htmlFor="post_title"
                      className="text-Gray-700 text-sm font-medium "
                    >
                      Address:
                    </label>
                    <div>
                      <ImageViewBox src={item.address} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-Gray-200 rounded-lg p-4">
            <h4 className="text-lg font-semibold pb-3 text-Gray-900">
              Authorised Signatories
            </h4>
            <div className="flex flex-col gap-y-4">
              {data.authorized_signatories_of_identification_doc?.map(
                (item, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-1 md:grid-cols-4 gap-2"
                  >
                    {/* Input item */}
                    <div className="flex flex-col gap-y-2">
                      <label
                        htmlFor="post_title"
                        className="text-Gray-700 text-sm font-medium "
                      >
                        Name:
                      </label>
                      <div>
                        <p className="font-semibold text-Gray-900">
                          {item.name}
                        </p>
                      </div>
                    </div>
                    {/* Input item */}
                    <div className="flex flex-col gap-y-2">
                      <label
                        htmlFor="post_title"
                        className="text-Gray-700 text-sm font-medium "
                      >
                        Identification No.
                      </label>
                      <div>
                        <p className="font-semibold text-Gray-900">
                          {item.id_no}
                        </p>
                      </div>
                    </div>

                    {/* Input item */}
                    <div className="flex flex-col gap-y-2">
                      <label
                        htmlFor="post_title"
                        className="text-Gray-700 text-sm font-medium "
                      >
                        Document:
                      </label>
                      <div>
                        <ImageViewBox src={item.document} />
                      </div>
                    </div>
                    {/* Input item */}
                    <div className="flex flex-col gap-y-2">
                      <label
                        htmlFor="post_title"
                        className="text-Gray-700 text-sm font-medium "
                      >
                        Address:
                      </label>
                      <div>
                        <ImageViewBox src={item.address} />
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
