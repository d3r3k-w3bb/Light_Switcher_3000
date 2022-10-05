class Node {
  public:
    Node();
    ~Node();
    virtual void io_init(){
      string inputString = [](){
        
      };
      string outputString = [](){};
    };
  private:
    std::vector<input> inputList;
    std::vector<input> outputList;
}