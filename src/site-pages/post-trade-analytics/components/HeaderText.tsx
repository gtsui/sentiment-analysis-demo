const HeaderText = () => {
  return (
    <div className="flex flex-col gap-0 mb-10">
      <p className="text-contrast-high">
        This dashboard will allow you to privately retrieve your past trade
        history on Bybit to analyze key post-trade metrics.
      </p>
      <p className="text-contrast-high">
        Let&apos;s start by entering your ByBit API key/secret to import your
        trade history.
        <p>
          You can generate a new ByBit API key/secret{" "}
          <a
            className="text-blue-500 underline"
            href="https://www.bybit.com/app/user/api-management"
          >
            here.
          </a>
        </p>
      </p>
      <p className="text-contrast-medium text-p2">
        NOTE: For your own safety, make sure to set the API key/secret to
        read-only.
      </p>
      <p className="text-contrast-medium text-p2">
        We will never take any unauthorized actions with your account, but this
        is crypto - trust no one.
      </p>
    </div>
  );
};

export default HeaderText;
