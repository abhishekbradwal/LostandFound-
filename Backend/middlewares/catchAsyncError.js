export const catchAsyncErrors = (theFunction) => {
    return (req, res, next) => {
      console.log(req, res);
      Promise.resolve(theFunction(req, res, next)).catch(next);
    };
  };